import { Button } from '@/components/ui/button'
import { useEvents } from '../hooks/events.ts'
import { saveAs } from 'file-saver'

const CalendarButton = () => {
  const { data, isPending, isError, error } = useEvents('2024-09-02')

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
      const startTime = `20240902T${event.start}`
      const endTime = `20240902T${event.end}`

      icsContent += `BEGIN:VEVENT\nSUMMARY:${event.title}\nLOCATION:${event.location}\nDTSTART:${startTime}\nDTEND:${endTime}\nEND:VEVENT\n`
    }

    icsContent += 'END:VCALENDAR'

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    saveAs(blob, 'events.ics')
  }

  return <Button onClick={generateICSFile}>Download Calendar</Button>
}

export default CalendarButton
