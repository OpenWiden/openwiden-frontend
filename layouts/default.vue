<template>
  <div class="rootWrapper">
    <div id="notifications" />
    <top-header />
    <main class="main" role="main">
      <nuxt />
    </main>
    <the-footer />
  </div>
</template>

<script>
import TopHeader from '@/src/components/TopHeader/TopHeader';
import TheFooter from '@/src/components/TheFooter/TheFooter';

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
      const { authToken, refreshToken } = await this.$api.authorizeUser(
        code,
        state
      );

      this.$store.dispatch('setAuthTokens', { authToken, refreshToken });
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

.rootWrapper {
  overflow-x: hidden;
}
</style>
