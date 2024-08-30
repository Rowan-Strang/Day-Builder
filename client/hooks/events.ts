import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getAllEvents,
  getEventById,
  getLastEvent,
  addEvent,
  deleteEventById,
} from '../apis/events'
import { EventData } from '../../models/events'

export function useEvents(date: string) {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => getAllEvents(date),
  })
}
export function useLastEvent(date: string) {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => getLastEvent(date),
  })
}

export function useEventById(id: number) {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => getEventById(id),
  })
}

export function useAddEvent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (event: EventData) => addEvent(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}
