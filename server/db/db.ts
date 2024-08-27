import connection from './connection.ts'
import { Event, EventData } from 'models/events.ts'

const db = connection

export function getAllEvents(date: string): Promise<EventData[]> {
  return db('events')
    .where({ date })
    .select(
      'events.id as id',
      'events.title as title',
      'events.location as location',
      'events.start as start',
      'events.end as end',
      'events.locked as locked',
    )
}

export function getEventByID(id: number): Promise<EventData> {
  return db('events')
    .where({ id })
    .select(
      'events.id as id',
      'events.title as title',
      'events.location as location',
      'events.start as start',
      'events.end as end',
      'events.locked as locked',
    )
}

export function deleteEventById(id: number) {
  return db('events').where({ id }).del()
}

export function addEvent(newEvent: Event) {
  return db('events').insert({
    title: newEvent.title,
    location: newEvent.location,
    date: newEvent.date,
    start: newEvent.start,
    end: newEvent.end,
    locked: newEvent.locked,
  })
}
