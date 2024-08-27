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
      title: 'Filming with Sam',
      location: 'Location One',
      date: '2024-12-28',
      start: new Date('2024-09-01T10:00:00Z'),
      end: new Date('2024-09-01T12:00:00Z'),
      locked: false,
    },
    {
      id: 2,
      title: 'Filming with John',
      location: 'Location Two',
      date: '2024-12-28',
      start: new Date('2024-09-02T14:00:00Z'),
      end: new Date('2024-09-02T16:00:00Z'),
      locked: false,
    },
    {
      id: 3,
      title: 'Back to Sam',
      location: 'Location One',
      date: '2024-12-28',
      start: new Date('2024-09-03T09:00:00Z'),
      end: new Date('2024-09-03T11:00:00Z'),
      locked: false,
    },
    {
      id: 4,
      title: 'The Ceremony',
      location: 'Location Four',
      date: '2024-12-28',
      start: new Date('2024-09-03T09:00:00Z'),
      end: new Date('2024-09-03T11:00:00Z'),
      locked: true,
    },
  ])
}
