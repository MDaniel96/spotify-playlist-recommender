import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const config: Config = require('config');

type Config = {
  port: number;
  connectionOptions: PostgresConnectionOptions;
};
