import { ChangeEvent, FormEvent, useState } from 'react'
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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'

function AddEvent() {
  // const { data, isPending, isError, error } = useLastEvent('2024-12-28')

  // if (isPending) {
  //   return <p>fetching your day...</p>
  // }

  // if (isError) {
  //   console.error(error.message)
  //   return <p>code failed successfully</p>
  // }

  // console.log(data)

  const [formValues, setFormValues] = useState({
    title: '',
    location: '',
    date: '2024-12-28',
    start: '',
    end: '',
    locked: false,
  })

  const { title, location, date, start, end, locked } = formValues

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: async (event: Event) => addEvent(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

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
  // const onCheckBoxChange = (evt: ChangeEvent<HTMLInputElement>) => {
  //   const { name, checked } = evt.currentTarget
  //   setFormValues((previous) => ({
  //     ...previous,
  //     [name]: checked,
  //   }))
  // }

  const convertTo24HourFormat = (time: string): string => {
    return `${time}:00`
  }

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    // console.log('this is the start' + start)
    // console.log('Form submitted')

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
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Add Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="form" onSubmit={onSubmit} aria-label="Add Event">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title:</Label>
                <Input
                  id="title"
                  placeholder="What's going down?"
                  className="form__input"
                  type="text"
                  name="title"
                  value={title}
                  onChange={onChange}
                />
                <br />
                <Label htmlFor="location">Address:</Label>
                <Input
                  id="location"
                  type="text"
                  name="location"
                  value={location}
                  onChange={onChange}
                />
                <br />
                <Label htmlFor="start">Starting:</Label>
                <Input
                  type="time"
                  name="start"
                  id="start"
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

{
  /* this stuff here */

  {
    /* <br />
                <div className="items-top flex space-x-2">
                  <Checkbox
                    id="locked"
                    // type="checkbox"
                    name="locked"
                    checked={locked}
                    onChange={onCheckBoxChange}
                  />
                </div>
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="locked"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Lock Start Time
                  </label>
                  <p className="text-sm text-muted-foreground">
                    For fixed events that have no flexibility
                  </p>
                </div>
                <br /> */
  }
}
// {
//   /* <div className="items-top flex space-x-2">
//                   <Checkbox
//                     id="locked"
//                     // type="checkbox"
//                     name="locked"
//                     checked={locked}
//                     onChange={onCheckBoxChange}
//                   />
//                   <div className="grid gap-1.5 leading-none">
//                     <label
//                       htmlFor="locked"
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       Lock Start Time
//                     </label>
//                     <p className="text-sm text-muted-foreground">
//                       For fixed events that have no flexibility
//                     </p>
//                   </div> */
// }
{
  /* </div> */
}
{
  /* this stuff here */
}
{
  /* <br />
                <Label htmlFor="locked">Lock Start Time:</Label>
                <Input
                  type="checkbox"
                  name="locked"
                  id="locked"
                  checked={locked}
                  onChange={onCheckBoxChange}
                /> */
}

{
  /* <h2>Add an Event:</h2>
      <form className="form" onSubmit={onSubmit} aria-label="Add Event">
        <div>
          <label htmlFor="title">Title: </label>
          <input
            className="form__input"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="location">Address: </label>
          <input
            type="text"
            name="location"
            id="location"
            value={location}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="start">Starting: </label>
          <input
            type="time"
            name="start"
            id="start"
            value={start}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="locked">Lock Start Time</label>
          <input
            type="checkbox"
            name="locked"
            id="locked"
            checked={locked}
            onChange={onCheckBoxChange}
          />
        </div>
        <button type="submit" className="button-primary">
          Add Event
        </button>
      </form> */
}

// export function CardWithForm() {
//   return (
//     <Card className="w-[350px]">
//       <CardHeader>
//         <CardTitle>Create project</CardTitle>
//         <CardDescription>Deploy your new project in one-click.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="grid w-full items-center gap-4">
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="name">Name</Label>
//               <Input id="name" placeholder="Name of your project" />
//             </div>
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="framework">Framework</Label>
//               <Select>
//                 <SelectTrigger id="framework">
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent position="popper">
//                   <SelectItem value="next">Next.js</SelectItem>
//                   <SelectItem value="sveltekit">SvelteKit</SelectItem>
//                   <SelectItem value="astro">Astro</SelectItem>
//                   <SelectItem value="nuxt">Nuxt.js</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </form>
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <Button variant="outline">Cancel</Button>
//         <Button>Deploy</Button>
//       </CardFooter>
//     </Card>
//   )
// }
