/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('events').del()
  await knex('events').insert([
    {
      id: 1,
      title: 'Filming with Anna',
      location: '5 Daniel Street, Martinborough 5711, New Zealand',
      date: '2024-12-28',
      start: '10:00:00',
      end: null,
      locked: false,
    },
    {
      id: 2,
      title: 'Filming with John',
      location: '5 Daniel Street, Martinborough 5711, New Zealando',
      date: '2024-12-28',
      start: '11:00:00',
      end: null,
      locked: false,
    },
    {
      id: 3,
      title: 'Back to Sam for final preperations',
      location: '5 Daniel Street, Martinborough 5711, New Zealand',
      date: '2024-12-28',
      start: '12:15:00',
      end: null,
      locked: false,
    },
    {
      id: 4,
      title: 'The Ceremony',
      location: '1005 White Rock Road, Tuturumuri 5782, New Zealand',
      date: '2024-12-28',
      start: '14:30:00',
      end: null,
      locked: true,
    },
  ])
}
