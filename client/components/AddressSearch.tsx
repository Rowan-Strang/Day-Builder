import React, { useRef } from 'react'
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api'

// Define libraries array outside the component
const libraries = ['places'] as any[]

const AddressAutocomplete = () => {
  const inputRef = useRef()

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces()
    if (place) {
      console.log(place.formatted_address)
      console.log(place.geometry.location.lat())
      console.log(place.geometry.location.lng())
    }
  }
  const searchOptions = {
    bounds: {
      north: -34.36,
      south: -47.35,
      east: 178.84,
      west: 166.28,
    },
    componentRestrictions: { country: 'NZ' },
  }

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCFndD6iipNflNqytaZOIABhhIWclMmS4w"
      libraries={libraries} // Use the constant array here
      onLoad={() => console.log('Google Maps script loaded successfully')}
      onError={(e) => console.error('Error loading Google Maps script:', e)}
    >
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
        options={searchOptions}
      >
        <input
          type="text"
          className="rounded-md border-2 border-gray-300 p-2 focus:border-blue-500"
          placeholder="Enter Location"
        />
      </StandaloneSearchBox>
    </LoadScript>
  )
}

export default AddressAutocomplete
