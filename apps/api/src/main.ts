/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';

import { router as fileRouter } from './app/routers/file';
import { FILE_UPLOAD_API_URL } from '@muzzy/shared/api-interface';

const app = express();

app.use(FILE_UPLOAD_API_URL, fileRouter);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
