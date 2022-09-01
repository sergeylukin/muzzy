const productionDomain = 'muzzy.sergeylukin.com';
const isApi = process.env.RENDER_SERVICE_NAME === 'muzzy-api';
const apiHost = isApi ? process.env.HOST : process.env.API_HOST;
const apiPort = isApi ? process.env.PORT : null;
const frontHost = isApi
  ? process.env.FRONT_HOST
  : process.env.RENDER_SERVICE_NAME;

export const environment = {
  production: true,
  api: {
    host: apiHost,
    port: apiPort,
    hostport: `https://${apiHost}`,
  },
  front: {
    host: frontHost || productionDomain,
    hostport: `https://${frontHost}`,
  },
  redis: {
    url: process.env.REDIS_URL,
  },
};
