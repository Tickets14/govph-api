import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('services', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('agency_id').notNullable().references('id').inTable('agencies').onDelete('CASCADE');
    table.string('name', 255).notNullable();
    table.string('slug', 100).notNullable().unique();
    table.text('description').notNullable();
    table.string('estimated_time', 100).nullable();
    table.string('appointment_url', 512).nullable();
    table.boolean('is_active').notNullable().defaultTo(true);
    table.timestamps(true, true);

    table.index('agency_id');
    table.index('is_active');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('services');
}
