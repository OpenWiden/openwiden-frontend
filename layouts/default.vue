<template>
  <div>
    <top-header />
    <main class="main" role="main">
      <nuxt />
    </main>
    <the-footer />
  </div>
</template>

<script>
import cookie from 'js-cookie';
import TopHeader from '@/src/components/TopHeader/TopHeader';
import TheFooter from '@/src/components/TheFooter/TheFooter';
import { MUTATIONS } from '@/store/mutationTypes';

export default {
  components: {
    TopHeader,
    TheFooter,
  },
  async beforeMount() {
    const href = new URL(window.location.href);
    const code = href.searchParams.get('code');
    const state = href.searchParams.get('state');

    if (code && state) {
      const {
        detail: { access: authToken, refresh: refreshToken },
      } = await this.$api.authorizeUser(code, state);

      cookie.set('auth', authToken);
      cookie.set('refresh', refreshToken);

      this.$store.commit(MUTATIONS.SET_AUTH, authToken);
      this.$store.dispatch('getUser', {
        authToken,
        refreshToken,
      });

      href.searchParams.delete('code');
      href.searchParams.delete('state');

      window.history.pushState(null, '', href.toString());
    }
  },
};
</script>

<style>
.main {
  min-height: 100vh;
}
</style>
