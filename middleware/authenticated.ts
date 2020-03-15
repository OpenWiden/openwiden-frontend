// import { Context } from '@nuxt/types';

export default function({ req }: any) {
  const authCookie = req.cookies?.auth || null;
  // const user = await rp({
  //   uri: 'https://openwiden-develop.herokuapp.com/users',
  //   headers: {
  //     Authorization: `JWT ${authCookie}`,
  //   },
  // });
  // console.log('-->', user);
  // store.commit('setUser', user);
  // try {
  //   context.$axios
  //     .$get(`/users`, {
  //       headers: {
  //         Authorization: `JWT ${authCookie}`,
  //       },
  //     })
  //     .then((resp: any) => console.log('resp -->', resp));
  // } catch (err) {}

  console.log('authCookie -->', authCookie);

  // try {
  //   const sas = await $axios.$get(`/users`, {
  //     headers: {
  //       Authorization: `JWT ${authCookie}`,
  //     },
  //   });
  //   console.log('-->', sas);
  // } catch (err) {
  //   throw new Error(err);
  // }

  // store.commit('setAuth', authCookie);
}
