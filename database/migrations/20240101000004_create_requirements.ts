import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('requirements', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('step_id').notNullable().references('id').inTable('steps').onDelete('CASCADE');
    table.uuid('service_id').notNullable().references('id').inTable('services').onDelete('CASCADE');
    table.string('name', 255).notNullable();
    table.text('description').nullable();
    table.boolean('is_optional').notNullable().defaultTo(false);
    table.text('notes').nullable();
    table.timestamps(true, true);

    table.index('step_id');
    table.index('service_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('requirements');
}
