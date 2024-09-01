import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addEvent } from '@/apis/events.ts'
import { Event } from 'models/events.ts'
import { Button } from '@/components/ui/button'
import { useLastEvent } from '../hooks/events.ts'
// import AddressSearch from './AddressSearch.tsx'
// import React, { useRef } from 'react'
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const libraries = ['places'] as any[]

function AddEvent() {
  const inputRef = useRef()
  const queryClient = useQueryClient()
  const titleInputRef = useRef<HTMLInputElement>(null)
  const [titleError, setTitleError] = useState('')
  const defaultFormValues = {
    title: '',
    location: '',
    date: '2024-12-28',
    start: '',
    end: '',
    locked: false,
  }

  const {
    data: otherData,
    isPending: otherPending,
    isError: otherIsError,
    error: otherError,
  } = useLastEvent('2024-12-28')

  function add30Minutes(time: string): string {
    const now = new Date()
    const [hours, minutes] = time.split(':').map(Number)
    now.setHours(hours, minutes + 30)
    const newHours = now.getHours().toString().padStart(2, '0')
    const newMinutes = now.getMinutes().toString().padStart(2, '0')
    return `${newHours}:${newMinutes}`
  }

  // Using useRef to create a reference to the form or a specific element
  const formRef = useRef<HTMLDivElement>(null)

  const [formValues, setFormValues] = useState({
    title: '',
    location: '',
    date: '2024-12-28',
    start: '',
    end: '',
    locked: false,
  })

  useEffect(() => {
    // Automatically scroll to the form when the component mounts or updates
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [otherData, formValues]) // You can include dependencies if you want this to happen based on certain conditions

  useEffect(() => {
    if (otherData) {
      setFormValues((prev) => ({
        ...prev,
        start: add30Minutes(otherData.end || otherData.start),
      }))
    }
  }, [otherData])

  const { title, location, date, start, end, locked } = formValues

  const addMutation = useMutation({
    mutationFn: async (event: Event) => addEvent(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      queryClient.invalidateQueries({ queryKey: ['lastevent'] })
      setFormValues((prevValues) => ({
        ...prevValues,
        title: defaultFormValues.title,
        locked: defaultFormValues.locked,
      }))
      // Set a timeout to ensure UI has time to settle
      setTimeout(() => {
        if (titleInputRef.current) {
          titleInputRef.current.focus()
        }
      }, 300) // Adjust the timeout as necessary
    },
  })

  if (otherPending) {
    return <p>Loading Form</p>
  }

  if (otherIsError) {
    console.error(otherError.message)
    return <p>code failed successfully</p>
  }

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget
    setFormValues((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const onCheckBoxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = evt.currentTarget
    setFormValues((previous) => ({
      ...previous,
      [name]: checked,
    }))
  }

  const convertTo24HourFormat = (time: string): string => {
    return `${time}:00`
  }

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (!formValues.title.trim()) {
      setTitleError('Title is required.') // Set error message
      if (titleInputRef.current) {
        titleInputRef.current.focus() // Focus back to the title input
      }
      return // Stop the form submission if there's no title
    }
    // Clear the error message only when the form submission is successful
    setTitleError('')
    await addMutation.mutate({
      title: title,
      location,
      date,
      start: convertTo24HourFormat(start),
      end,
      locked,
    })
  }

  const handlePlaceChanged = () => {
    const places = inputRef.current.getPlaces()
    if (places.length === 0) {
      return
    }
    const place = places[0]

    // Assuming you want to save the formatted address and coordinates
    const formattedAddress = place.formatted_address
    const lat = place.geometry.location.lat()
    const lng = place.geometry.location.lng()

    // Update the form values
    setFormValues((prev) => ({
      ...prev,
      location: formattedAddress, // or store `{ address: formattedAddress, lat, lng }` as an object if needed
    }))

    console.log(formValues)
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
    <>
      <Card className="w-[640px] border-2 border-pink-200" ref={formRef}>
        <CardHeader>
          <CardTitle>Add Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="form" onSubmit={onSubmit} aria-label="Add Event">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title:</Label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  className="rounded-md border-2 border-gray-300 p-2 focus:border-blue-500"
                  value={formValues.title}
                  onChange={(e) =>
                    setFormValues({ ...formValues, title: e.target.value })
                  }
                  ref={titleInputRef}
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                />
                {titleError && <p className="text-red-500">{titleError}</p>}
                <br />
                {/* <Label htmlFor="location">Address:</Label>
                <Input
                  id="location"
                  type="text"
                  name="location"
                  className="rounded-md border-2 border-gray-300 p-2 focus:border-blue-500"
                  value={location}
                  onChange={onChange}
                /> */}
                <br />
                <Label htmlFor="location">Location:</Label>
                <LoadScript
                  googleMapsApiKey="API KEY HERE"
                  libraries={libraries} // Use the constant array here
                  onLoad={() =>
                    console.log('Google Maps script loaded successfully')
                  }
                  onError={(e) =>
                    console.error('Error loading Google Maps script:', e)
                  }
                >
                  <div className="w-full">
                    <StandaloneSearchBox
                      onLoad={(ref) => (inputRef.current = ref)}
                      onPlacesChanged={handlePlaceChanged}
                      options={searchOptions}
                    >
                      <input
                        type="text"
                        className="w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500"
                        placeholder="Enter Location"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault() // Prevent form submission
                          }
                        }}
                      />
                    </StandaloneSearchBox>
                  </div>
                </LoadScript>
                <br />
                <Label htmlFor="start">Starting:</Label>
                <Input
                  type="time"
                  name="start"
                  className="w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500"
                  placeholder="Enter Location"
                  id="start"
                  step="300"
                  value={start}
                  onChange={onChange}
                />
                <Label htmlFor="locked">Lock Start Time:</Label>
                <Input
                  type="checkbox"
                  name="locked"
                  id="locked"
                  checked={locked}
                  onChange={onCheckBoxChange}
                />
                <br />
              </div>
            </div>
            <CardFooter className="flex justify-between">
              <Button type="submit">Add Event</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default AddEvent
