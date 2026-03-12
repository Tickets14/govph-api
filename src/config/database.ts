import knex from 'knex';
import { env } from './env';

const db = knex({
  client: 'pg',
  connection: env.DATABASE_URL
    ? env.DATABASE_URL
    : {
        host: env.DB_HOST,
        port: env.DB_PORT,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
      },
  pool: { min: 2, max: 10 },
});

export default db;
