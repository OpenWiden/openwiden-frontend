<template>
  <div>
    <top-header />
    <nuxt />
  </div>
</template>

<script>
import cookie from 'js-cookie';
import TopHeader from '@/src/components/TopHeader/TopHeader';

export default {
  components: {
    TopHeader,
  },
  beforeMount() {
    const href = new URL(window.location.href);
    const code = href.searchParams.get('code');
    const state = href.searchParams.get('state');

    if (code && state) {
      this.$axios
        .$get(`/users/complete/github/?code=${code}&state=${state}`)
        .then((result) => {
          const {
            detail: { access, refresh },
          } = result;

          cookie.set('auth', access);
          cookie.set('refresh', refresh);

          this.$store.commit('setAuth', access);

          href.searchParams.delete('code');
          href.searchParams.delete('state');

          window.history.pushState(null, '', href.toString());
        });
    }
  },
};
</script>
