<template>
  <div>
    <top-header />
    <main role="main">
      <nuxt />
    </main>
  </div>
</template>

<script>
import cookie from 'js-cookie';
import TopHeader from '@/src/components/TopHeader/TopHeader';
import { MUTATIONS } from '@/store/mutationTypes';

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
        .$get(`auth/complete/github/?code=${code}&state=${state}`)
        .then((result) => {
          const {
            detail: { access, refresh },
          } = result;

          cookie.set('auth', access);
          cookie.set('refresh', refresh);

          this.$store.commit(MUTATIONS.SET_AUTH, access);
          this.$store.dispatch('getUser', access);

          href.searchParams.delete('code');
          href.searchParams.delete('state');

          window.history.pushState(null, '', href.toString());
        });
    }
  },
};
</script>
