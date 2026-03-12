import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('steps', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('service_id').notNullable().references('id').inTable('services').onDelete('CASCADE');
    table.integer('order').notNullable();
    table.string('title', 255).notNullable();
    table.text('description').nullable();
    table.boolean('is_optional').notNullable().defaultTo(false);
    table.timestamps(true, true);

    table.index('service_id');
    table.unique(['service_id', 'order']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('steps');
}
