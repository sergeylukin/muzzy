import * as express from 'express';
import { redis } from '@muzzy/redis';
import * as bodyParser from 'body-parser';

import { environment } from '@muzzy/environments';
import { IFileUploadApiResponse } from '@muzzy/file';

const app = express();

app.get('/:fileId', async (req, res) => {
  const id = req.params.fileId;
  const value = await redis.get(String(id));
  res.setHeader('Content-Type', 'image/jpeg');
  res.end(Buffer.from(value, 'hex'));
});

app.post(
  '/',
  bodyParser.raw({ type: ['image/jpeg', 'image/png'], limit: '50mb' }),
  async (req, res) => {
    const id = Number(new Date());
    await redis.set(id.toString(), req.body.toString('hex'));
    res.send({
      url: environment.api.hostport + '/v1/file/' + String(id),
    } as IFileUploadApiResponse);
  }
);

export const router = app;
