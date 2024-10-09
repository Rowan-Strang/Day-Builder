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
