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
      title: 'Filming with Sam the Bride',
      location: 'Location One',
      date: '2024-12-28',
      start: '10:00:00',
      end: '10:45:00',
      locked: false,
    },
    {
      id: 2,
      title: 'Filming with John The Groom',
      location: 'Location Two',
      date: '2024-12-28',
      start: '11:00:00',
      end: '12:00:00',
      locked: false,
    },
    {
      id: 3,
      title: 'Back to Sam for final preperations',
      location: 'Location One',
      date: '2024-12-28',
      start: '12:15:00',
      end: '14:00:00',
      locked: false,
    },
    {
      id: 4,
      title: 'The Ceremony',
      location: 'Location Four',
      date: '2024-12-28',
      start: '14:30:00',
      end: '15:00:00',
      locked: true,
    },
  ])
}
