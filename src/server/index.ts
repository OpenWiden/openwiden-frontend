const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const app = express();

// Import and Set Nuxt.js options
const cookieParser = require('cookie-parser');
const config = require('../../nuxt.config.js');

config.dev = process.env.NODE_ENV !== 'production';

async function start() {
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  await nuxt.ready();

  if (config.dev) {
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
