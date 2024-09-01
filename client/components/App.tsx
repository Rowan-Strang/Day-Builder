import Events from './Events.tsx'

const App = () => {
  return (
    <>
      <div className="grid min-h-[100svh] grid-rows-[auto_1fr_auto]">
        <div className="row-start-2 row-end-3 flex flex-col items-center gap-4">
          <br />
          <br />
          <h1 className="text-4xl font-bold tracking-wide text-indigo-600">
            Welcome to Day Builder
          </h1>
          <Events />
        </div>
      </div>
    </>
  )
}

export default App

// import Events from './Events.tsx'

// const App = () => {
//   return (
//     <>
//       <div className="grid min-h-[100svh] grid-rows-[auto_1fr_auto]">
//         <div className="row-start-2 row-end-3 flex flex-col items-center gap-4">
//           <br />
//           <br />
//           <h1 className="text-4xl font-bold tracking-wide text-indigo-600">
//             Welcome to Day Builder
//           </h1>
//           <Events />
//         </div>
//       </div>
//     </>
//   )
// }

// export default App

// import React, { useRef } from 'react'
// import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api'

// const App = () => {
//   const inputRef = useRef()

//   const handlePlaceChanged = () => {
//     const [place] = inputRef.current.getPlaces()
//     if (place) {
//       console.log(place.formatted_address)
//       console.log(place.geometry.location.lat())
//       console.log(place.geometry.location.lng())
//     }
//   }
//   return (
//     <LoadScript
//       googleMapsApiKey="AIzaSyCFndD6iipNflNqytaZOIABhhIWclMmS4w"
//       libraries={['places']}
//     >
//       <StandaloneSearchBox
//         onLoad={(ref) => (inputRef.current = ref)}
//         onPlacesChanged={handlePlaceChanged}
//       >
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Enter Location"
//         />
//       </StandaloneSearchBox>
//     </LoadScript>
//   )
// }

// export default App
