import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
const { DB_PORT, DB_NAME, DB_HOST, DB_PASSWORD, DB_USERNAME } = process.env;

const config = {
  type: 'postgres',
  host: DB_HOST!,
  port: parseInt(DB_PORT, 10),
  username: DB_USERNAME!,
  password: DB_PASSWORD!,
  database: DB_NAME!,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
