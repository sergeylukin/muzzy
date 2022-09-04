import { environment } from '@muzzy/environments';
const baseURL = environment.api.hostport;
const apiVersion = 'v1';
const model = 'file';
export const fileApiBaseUrl = `${baseURL}/${apiVersion}/${model}`;
export const getFileApiUrlWithId = (id: string | undefined) =>
  `${fileApiBaseUrl}/${id}`;

export * from './fileUpload';
