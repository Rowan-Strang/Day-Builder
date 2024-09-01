// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
import { useEvents } from '../hooks/events.ts'
import CalendarButton from './CalendarButton.tsx'
import Editor from './Editor.tsx'

import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const Events = () => {
  const { data, isPending, isError, error } = useEvents('2024-12-28')

  if (isPending) {
    return <p>fetching your day...</p>
  }

  if (isError) {
    console.error(error.message)
    return <p>code failed successfully</p>
  }

  // console.log(data)

  function convertTo12Hour(time24: string) {
    const [initialHours, minutes] = time24.split(':').map(Number)
    const period = initialHours >= 12 ? 'PM' : 'AM'
    const hours = initialHours % 12 || 12
    const hoursString = String(hours).padStart(2, '0')
    const minutesString = String(minutes).padStart(2, '0')
    return `${hoursString}:${minutesString} ${period}`
  }

  return (
    <>
      <div className="grid min-h-[100svh] grid-rows-[auto_1fr_auto]">
        <div className="row-start-2 row-end-3 flex flex-col items-center gap-4">
          <br />
          {data.length <= 4 && <Editor />}
          <br />
          {data.map((event) => (
            <h2 key={(event.title, event.id)} className="w-full max-w-md">
              <Card className="flex w-full flex-row items-center justify-between">
                <CardContent className="flex items-center">
                  <p>
                    {event.locked ? '🔒' : ''}
                    {convertTo12Hour(event.start)}
                  </p>
                </CardContent>
                <CardHeader className="flex flex-col text-right">
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.location}</CardDescription>
                </CardHeader>
              </Card>
            </h2>
          ))}
          <br />
        </div>
        <br />
        {data.length > 4 && <Editor />}
        <br />
        <CalendarButton />
        <br />
      </div>
    </>
  )
}

export default Events
