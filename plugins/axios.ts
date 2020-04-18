import consola from 'consola';

export default function (context: any) {
  const { $axios, req } = context;

  if (req?.cookies?.auth) {
    $axios.setHeader('Authorization', `JWT ${req.cookies.auth}`);
  }

  $axios.onRequest((config: any) => {
    consola.info(`[ ${config.method.toUpperCase()} ] ${config.url}`);
  });

  $axios.onError((error: any) => {
    const { status } = error?.response;

    if (status) {
      switch (status) {
        case 401:
          break;
        case 404:
          // redirect('/404');
          break;
        case 500:
          // redirect('/500');
          break;
      }
    }
  });
}
