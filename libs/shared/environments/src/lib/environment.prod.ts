const productionDomain = process.env['NX_2ND_LEVEL_DOMAIN'];
const previewDomain = process.env['NX_PREVIEW_DOMAIN'];
const MAIN_BRANCH_API_SERVICE_NAME =
  process.env['NX_MAIN_BRANCH_API_SERVICE_NAME'];
const isApi = process.env['NX_SERVICE_NAME'] === MAIN_BRANCH_API_SERVICE_NAME;
const serviceHost = process.env['RENDER_EXTERNAL_HOSTNAME']?.replace(
  new RegExp(`\.${productionDomain}|\.${previewDomain}`),
  ''
);
const apiHost = isApi ? serviceHost : process.env['NX_API_HOST'];
const isMainBranch = apiHost === MAIN_BRANCH_API_SERVICE_NAME;

const apiBaseURL = `https://${apiHost}.${
  isMainBranch ? productionDomain : previewDomain
}`;
const apiPort = process.env['PORT'];
const frontHost = isApi ? process.env['NX_FRONT_HOST'] : serviceHost;
const frontBaseURL = `https://${frontHost}.${
  isMainBranch ? productionDomain : previewDomain
}`;

export const environment = {
  production: true,
  api: {
    host: apiHost,
    port: apiPort,
    hostport: apiBaseURL,
  },
  front: {
    host: frontHost,
    hostport: frontBaseURL,
  },
  redis: {
    url: process.env['REDIS_URL'],
  },
};
