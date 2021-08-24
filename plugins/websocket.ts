import consola from 'consola';
import { Context } from '@nuxt/types';

import { RepositoryMessage } from './notifications';

let ws: WebSocket;

function initConnection(context: Context) {
  const { auth } = context.store.state;

  if (auth) {
    connectToWebSocket(context);
  }
}

function abortConnection() {
  ws.close();
}

const connectToWebSocket = (context: Context): void => {
  const {
    app,
    isDev,
    store: {
      state: { auth: accessToken },
    },
  } = context;

  ws = new WebSocket(
    `wss://staging.openwiden.com/websocket/?access_token=${accessToken}`
  );

  ws.onopen = () => {
    isDev && consola.success('[WebSocket] connection opened');
  };

  ws.onclose = () => {
    isDev && consola.success('[WebSocket] connection closed');
  };

  ws.onmessage = (evt) => {
    evt.data.text().then((result: any) => {
      const repo: RepositoryMessage = JSON.parse(result);

      app.$notify(repo);
      app.$update(repo);
    });
  };

  ws.onerror = (error) => {
    isDev && consola.error(`[WebSocket] error: ${error}`);
  };
};

export default (context: Context, inject: any) => {
  inject('websocket', {
    init: () => initConnection(context),
    close: abortConnection,
  });
};
