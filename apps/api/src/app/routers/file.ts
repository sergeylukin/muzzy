import * as express from 'express';
import { redis } from '@muzzy/redis';
import * as bodyParser from 'body-parser';

import { getFileApiUrlWithId, IFileUploadApiResponse } from '@muzzy/file';

const app = express();

const ONE_HOUR_IN_SECONDS = 3600;

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
    const id = +new Date();
    const expiry = Number(req.query?.expiry);

    await redis.setEx(
      id.toString(),
      isNaN(expiry) ? ONE_HOUR_IN_SECONDS : expiry,
      req.body.toString('hex')
    );

    res.send({
      url: getFileApiUrlWithId(String(id)),
    } as IFileUploadApiResponse);
  }
);

export const router = app;
