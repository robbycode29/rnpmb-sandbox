import { DataSource } from 'typeorm';
import { User } from './users/users.entity';

import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User], // can add more entities here, one for each module
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

/* To create migrations, run:
npm run typeorm migration:generate -- -d src/data-source.ts -p ./src/migrations/{entity_name}

To run migrations, use:
npm run typeorm migration:run -- -d src/data-source.ts

To undo the last migration, use:
npm run typeorm migration:revert -- -d src/data-source.ts
 */
