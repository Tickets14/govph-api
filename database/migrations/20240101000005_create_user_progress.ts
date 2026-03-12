import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_progress', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('user_id', 255).notNullable();
    table.uuid('service_id').notNullable().references('id').inTable('services').onDelete('CASCADE');
    table.uuid('step_id').notNullable().references('id').inTable('steps').onDelete('CASCADE');
    table.boolean('is_completed').notNullable().defaultTo(false);
    table.timestamp('completed_at').nullable();

    table.index('user_id');
    table.index(['user_id', 'service_id']);
    table.unique(['user_id', 'service_id', 'step_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_progress');
}
