// import { useState } from 'react'
// import { getGreeting } from '../apiClient.ts'
// import { useQuery } from '@tanstack/react-query'
// import { Button } from '@/components/ui/button'
import Events from './Events.tsx'

const App = () => {
  return (
    <>
      <div className="grid min-h-[100svh] grid-rows-[auto_1fr_auto]">
        <div className="row-start-2 row-end-3 flex flex-col items-center gap-4">
          <br />
          <h1>Welcome to Day Builder!</h1>
          <Events />
        </div>
      </div>
    </>
  )
}

export default App

// const [count, setCount] = useState(0)

// const {
//   data: greeting,
//   isError,
//   isPending,
// } = useQuery({ queryKey: ['greeting', count], queryFn: getGreeting })

// if (isPending) return <p>Loading...</p>

{
  /* {count}
        <h1 className="text-3xl font-bold underline">{greeting}</h1>
        {isError && (
          <p style={{ color: 'red' }}>
            There was an error retrieving the greeting.
          </p>
        )}
        <Button onClick={() => setCount(count + 1)}>Click</Button> */
}
