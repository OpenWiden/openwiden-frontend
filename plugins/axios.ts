import consola from 'consola';

export default function (context: any) {
  const { $axios, redirect } = context;

  $axios.onRequest((config: any) => {
    consola.info(`[ ${config.method.toUpperCase()} ] ${config.url}`);
  });

  $axios.onError((error: any) => {
    if (error.response) {
      const { status } = error.response;

      if (status) {
        switch (status) {
          case 401:
            break;
          case 404:
            redirect('/404');
            break;
          case 500:
            redirect('/500');
            break;
        }
      }
    }
  });
}
