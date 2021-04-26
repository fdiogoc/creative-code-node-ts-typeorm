import 'reflect-metadata';
import { createConnection } from 'typeorm';

import dbConfig from './config/database';
import { createServer } from './server';

const PORT = process.env.PORT || 8000;

const main = async () => {
  await createConnection(dbConfig)
    .then((_connection) => {})
    .catch((err) => {
      console.log('Unable to connect to db', err);
      process.exit(1);
    });

  const app = await createServer();
  app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
  });
};

main().catch((err) => {
  console.error(err);
});
