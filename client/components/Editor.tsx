import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
// import { useAddEvent } from '../hooks/events.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addEvent, getLastEvent } from '@/apis/events.ts'
import { Event } from 'models/events.ts'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useLastEvent } from '../hooks/events.ts'

import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AddressSearch from './AddressSearch.tsx'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'

function AddEvent() {
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
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [otherData, formValues])

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

      setTimeout(() => {
        if (titleInputRef.current) {
          titleInputRef.current.focus()
        }
      }, 300)
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

  const onAddressSelect = (address: string) => {
    console.log(address)
    setFormValues((prev) => ({
      ...prev,
      location: address,
    }))
  }

  const convertTo24HourFormat = (time: string): string => {
    return `${time}:00`
  }

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (!formValues.title.trim()) {
      setTitleError('Title is required.')
      if (titleInputRef.current) {
        titleInputRef.current.focus()
      }
      return
    }

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
                <AddressSearch onAddressSelect={onAddressSelect} />
                <br />
                <Label htmlFor="start">Starting:</Label>
                <Input
                  type="time"
                  name="start"
                  className="rounded-md border-2 border-gray-300 p-2 focus:border-blue-500"
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
