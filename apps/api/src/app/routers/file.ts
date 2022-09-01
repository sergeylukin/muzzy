import * as express from 'express';

import { IFileUploadApiResponse } from '@muzzy/shared/api-interface';

const app = express();

export const router = app.get('/', (req, res) => {
  res.send({ url: 'HTTP' } as IFileUploadApiResponse);
});
