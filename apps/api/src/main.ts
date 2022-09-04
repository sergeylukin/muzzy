import * as express from 'express';
import * as cors from 'cors';

import { router as fileRouter } from './app/routers/file';
import { FILE_API_BASE_URL } from '@muzzy/file';
import { environment } from '@muzzy/environments';

const app = express();

app.use(
  cors({
    origin: environment.front.hostport,
  })
);

app.use(FILE_API_BASE_URL, fileRouter);
app.use('/health', (_req, res) => {
  res.send({ message: 'its working' });
});

const port = environment.api.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at ${environment.api.host}:${port}`);
});
server.on('error', console.error);
