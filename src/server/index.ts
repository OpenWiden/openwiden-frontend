import express from 'express';
import consola from 'consola';
import cookieParser from 'cookie-parser';
import config from '../../nuxt.config.js';
const { Nuxt, Builder } = require('nuxt');

const app = express();
const isDev = process.env.NODE_ENV !== 'production';

async function start() {
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  await nuxt.ready();

  if (isDev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }
  app.use(cookieParser(), nuxt.render);

  app.listen(port, (err: any) => {
    if (err) throw err;

    consola.ready({
      message: `[ 🚀 ] Server listening on http://${host}:${port}`,
      badge: true,
    });
  });
}

start();
