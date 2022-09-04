import { createClient } from 'redis';
import { environment } from '@muzzy/environments';

const client = (uri: string) => {
  let connection = null;

  return Object.freeze({
    uri,
    connect: async function () {
      if (!connection) {
        connection = createClient({
          url: this.uri,
        });
        connection.on('connect', function () {
          console.log('Redis client connected');
        });
        connection.on('error', function (err: string) {
          console.log('Something went wrong ' + err);
        });
        await connection.connect();
        return;
      }
      const ping = await connection.ping();
      if (!ping) {
        await connection.connect();
      }
    },
    get: async function (key: string) {
      await this.connect();
      return await connection.get(key);
    },
    set: async function (key: string, value: string, modifiers) {
      await this.connect();
      return await connection.set(key, value, modifiers);
    },
    disconnect: () => console.log('disconnecting'),
  });
};

export const redis = client(environment.redis.url);
