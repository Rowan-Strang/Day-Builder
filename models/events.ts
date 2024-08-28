export interface Event {
  title: string
  location: string
  date: string
  start: string
  end: string
  locked: boolean
}

export interface EventData extends Event {
  id: number
}
