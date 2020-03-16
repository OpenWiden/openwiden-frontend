export default function({ $axios, redirect }: any) {
  $axios.onRequest((config: any) => {
    console.log(`Making request to ${config.url}`);
  });

  $axios.onError((error: any) => {
    const code = error?.response?.status;

    if (code) {
      switch (code) {
        case 401:
          // Refresh token
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
