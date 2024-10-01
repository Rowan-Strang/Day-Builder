import { useEffect } from 'react'
import { Label } from '@/components/ui/label'

interface AddressSearchProps {
  onAddressSelect: (address: string) => void
}

const apiKey = import.meta.env.VITE_GOOGLE_API

function AddressSearch({ onAddressSelect }: AddressSearchProps) {
  useEffect(() => {
    const initAutocomplete = () => {
      const element = document.getElementById('autocomplete')

      if (!element) {
        console.error('autocomplete input element not found')
        return
      }

      if (!(element instanceof HTMLInputElement)) {
        console.error('Element is not an HTMLInputElement')
        return
      }

      const autocomplete = new window.google.maps.places.Autocomplete(element, {
        types: ['geocode'],
        componentRestrictions: { country: 'NZ' },
      })

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        if (place.geometry && place.geometry.location) {
          const address = place.formatted_address || ''
          // const lat = place.geometry.location.lat()
          // const lng = place.geometry.location.lng()
          // console.log('Coordinates:', { lat, lng })
          onAddressSelect(address)
        } else {
          console.log('No geometry information available for this place.')
        }
        // console.log('Selected place:', place)
        // Do something with the selected place data
      })
    }

    // Ensure Google Maps script is loaded and initialize the autocomplete
    const handleScriptLoad = () => {
      if (!window.google) {
        console.error('Google Maps API not loaded')
        return
      }
      initAutocomplete()
    }

    // Load the Google Maps script
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.async = true
    script.onload = handleScriptLoad
    document.body.appendChild(script)

    // Cleanup the script on component unmount
    return () => {
      document.body.removeChild(script)
    }
  }, [onAddressSelect])

  return (
    <>
      <Label htmlFor="location">Address:</Label>
      <input
        id="autocomplete"
        placeholder=" "
        className="rounded-md border-2 border-gray-300 p-2 focus:border-blue-500"
        type="text"
      />
    </>
  )
}

export default AddressSearch
