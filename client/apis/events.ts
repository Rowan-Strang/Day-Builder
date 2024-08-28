import request from 'superagent'
import { Event } from '../../models/events'

export async function getAllEvents(date: string) {
  const result = await request.get(`api/v1/events/all/${date}`)
  console.log(result.body)
  return result.body as Event[]
}

export async function getEventById(id: number) {
  const result = await request.get(`api/v1/events/${id}`)
  console.log(result.body)
  return result.body as Event
}

export async function addEvent(newEvent: Event) {
  const result = await request.post(`api/v1/events/`).send(newEvent)
  console.log(result.statusCode)
  return
}

export async function deleteEventById(id: number) {
  const result = await request.delete(`api/v1/events/${id}`)
  console.log(result.statusCode)
  return
}
