import { Usuario, Endereco } from '../entities';
import { ConnectionOptions } from 'typeorm';
import { SessionEntity } from 'typeorm-session-store';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'creativecode',
  entities: [Usuario, Endereco, SessionEntity],
  synchronize: true,

  logging: true,
};

export default config;
