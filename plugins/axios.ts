import consola from 'consola';

export default function({ $axios, redirect }: any) {
  $axios.onRequest((config: any) => {
    consola.info(`[ ${config.method.toUpperCase()} ] ${config.url}`);
  });

  $axios.onError((error: any) => {
    const code = error?.response?.status;

    if (code) {
      switch (code) {
        case 401:
          $axios
            .post('auth/token/refresh/', {
              data: {},
            })
            .then((refreshedJWT: string) =>
              consola.info('refreshedJWT-->', refreshedJWT)
            );
          break;
        case 404:
          redirect('/400');
          break;
        case 500:
          redirect('/500');
          break;
      }
    }
  });
}
