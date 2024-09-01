/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('events', (table) => {
    table.increments('id')
    table.string('title')
    table.string('location')
    table.string('date')
    table.string('start')
    table.string('end')
    table.boolean('locked')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('events')
}
