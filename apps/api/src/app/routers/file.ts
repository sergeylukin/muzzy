import * as express from 'express';
import { redis } from '@muzzy/redis';
import * as bodyParser from 'body-parser';

import { getFileApiUrlWithId, IFileUploadApiResponse } from '@muzzy/file';

const app = express();

app.get('/:fileId', async (req, res) => {
  const id = req.params.fileId;
  const value = (await redis.get(String(id))) || '';
  res.setHeader('Content-Type', 'image/jpeg');
  if (!value) res.status(404);
  res.end(Buffer.from(value, 'hex'));
});

app.post(
  '/',
  bodyParser.raw({ type: ['image/jpeg', 'image/png'], limit: '50mb' }),
  async (req, res) => {
    const id = Number(new Date());
    await redis.set(id.toString(), req.body.toString('hex'));
    res.send({
      url: getFileApiUrlWithId(String(id)),
    } as IFileUploadApiResponse);
  }
);

export const router = app;
