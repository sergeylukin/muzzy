import { createClient } from 'redis';
import { environment } from '@muzzy/shared/environments';

let conn;

export const client = async () => {
  if (!conn) {
    conn = createClient({
      url: environment.redis.url,
    });
    await conn.connect();
  }

  return conn;
};
