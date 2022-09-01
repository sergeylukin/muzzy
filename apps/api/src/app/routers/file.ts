import * as express from 'express';
import { client } from '../client';
import * as bodyParser from 'body-parser';

import { environment } from '@muzzy/shared/environments';
import { IFileUploadApiResponse } from '@muzzy/shared/api-interface';

const app = express();

app.get('/:fileId', async (req, res) => {
  const conn = await client();
  const id = req.params.fileId;
  const value = await conn.get(String(id));
  res.setHeader('Content-Type', 'image/jpeg');
  res.end(new Buffer(value, 'hex'));
});

app.post(
  '/',
  bodyParser.raw({ type: ['image/jpeg', 'image/png'], limit: '50mb' }),
  async (req, res) => {
    const id = Number(new Date());
    const conn = await client();
    await conn.set(id.toString(), req.body.toString('hex'));
    res.send({
      url: environment.api.hostport + '/v1/file/' + String(id),
    } as IFileUploadApiResponse);
  }
);

export const router = app;
