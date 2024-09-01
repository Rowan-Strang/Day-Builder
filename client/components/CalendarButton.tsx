import { Button } from '@/components/ui/button'
import { useEvents } from '../hooks/events.ts'
import { saveAs } from 'file-saver'

const CalendarButton = () => {
  const { data, isPending, isError, error } = useEvents('2024-12-28')

  if (isPending) {
    return <p>fetching your events...</p>
  }

  if (isError) {
    console.error(error.message)
    return <p>Failed to fetch events</p>
  }

  const generateICSFile = () => {
    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\n`

    for (let i = 0; i < data.length; i++) {
      const event = data[i]
      const startTime = `20240902T${event.start.replace(':', '').replace(':', '')}`

      // If there's a next event, set the current event's end time to be the next event's start time
      let endTime
      if (i < data.length - 1) {
        const nextEvent = data[i + 1]
        endTime = `20240902T${nextEvent.start.replace(':', '').replace(':', '')}`
      } else {
        // For the final event, make it 30 minutes long
        const [hours, minutes] = event.start.split(':').map(Number)
        const endMinutes = (minutes + 30) % 60
        const endHours = hours + Math.floor((minutes + 30) / 60)
        endTime = `20240902T${String(endHours).padStart(2, '0')}${String(endMinutes).padStart(2, '0')}00`
      }

      icsContent += `BEGIN:VEVENT\nSUMMARY:${event.title}\nLOCATION:${event.location}\nDTSTART:${startTime}\nDTEND:${endTime}\nEND:VEVENT\n`
    }

    icsContent += 'END:VCALENDAR'

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    saveAs(blob, 'events.ics')
  }

  return <Button onClick={generateICSFile}>Download Calendar</Button>
}
export default CalendarButton
