const productionDomain = process.env['NX_2ND_LEVEL_DOMAIN'];
const isApi = process.env.RENDER_SERVICE_NAME === 'muzzy-api';
const apiHost = isApi
  ? process.env.RENDER_EXTERNAL_HOSTNAME
  : process.env['NX_API_HOST'];

const apiBaseURL =
  apiHost === 'muzzy-api'
    ? `https://${apiHost}.${productionDomain}`
    : `https://${apiHost}`;
const apiPort = process.env.PORT;
const frontHost = isApi
  ? `${process.env.NX_FRONT_HOST}.${productionDomain}`
  : process.env.RENDER_SERVICE_NAME;

console.log('BUILD VARS');
console.log(isApi);
console.log(apiHost);
console.log(process.env.HOST);
console.log(apiPort);
console.log(frontHost);

export const environment = {
  production: true,
  api: {
    host: apiHost,
    port: apiPort,
    hostport: apiBaseURL,
  },
  front: {
    host: frontHost || productionDomain,
    hostport: `https://${frontHost}`,
  },
  redis: {
    url: process.env.REDIS_URL,
  },
};
