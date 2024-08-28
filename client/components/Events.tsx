// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
import { useEvents } from '../hooks/events.ts'
import Editor from './Editor.tsx'

const Events = () => {
  const { data, isPending, isError, error } = useEvents('2024-12-28')

  if (isPending) {
    return <p>fetching your day...</p>
  }

  if (isError) {
    console.error(error.message)
    return <p>code failed successfully</p>
  }

  return (
    <>
      <div className="grid min-h-[100svh] grid-rows-[auto_1fr_auto]">
        <div className="row-start-2 row-end-3 flex flex-col items-center gap-4">
          <br />
          {data.map((event) => (
            <h2 key={event.title}>{event.title}</h2>
          ))}
          <Editor />
        </div>
      </div>
    </>
  )
}

export default Events
