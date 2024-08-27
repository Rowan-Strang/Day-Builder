export interface Event {
  title: string
  location: string
  date: string
  start: Date
  end: Date
  locked: boolean
}

export interface EventData extends Event {
  id: number
}
