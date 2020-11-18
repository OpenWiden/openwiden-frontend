import { Context } from '@nuxt/types';

export default function (context: Context) {
  const connectToWebSocket = (accessToken: string): null | void => {
    if (!accessToken) return null;

    const ws = new WebSocket(
      `wss://staging.openwiden.com/websocket/?access_token=${accessToken}`
    );

    ws.onopen = () => {
      console.log('WS connection opened');
    };

    ws.onmessage = (event) => {
      event.data.text().then((message: any) => {
        context.app.$notify({ message });
      });
    };

    ws.onerror = (error) => {
      console.log(`WebSocket error: ${error}`);
    };
  };

  connectToWebSocket(context.store.state.auth);
}
