/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as cors from 'cors';

import { router as fileRouter } from './app/routers/file';
import { FILE_UPLOAD_API_URL } from '@muzzy/file';
import { environment } from '@muzzy/shared/environments';

const app = express();

app.use(
  cors({
    origin: environment.front.hostport,
  })
);

app.use(FILE_UPLOAD_API_URL, fileRouter);

const port = environment.api.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at ${environment.api.hostport}`);
});
server.on('error', console.error);
