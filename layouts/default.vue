<template>
  <div class="rootWrapper">
    <ToastsGroup />

    <app-header />

    <main class="main" role="main">
      <nuxt />
    </main>

    <app-footer />
  </div>
</template>

<script>
import AppHeader from '@/src/blocks/AppHeader/AppHeader';
import AppFooter from '@/src/blocks/AppFooter/AppFooter';
import ToastsGroup from '@/src/components/ToastsGroup/ToastsGroup';

export default {
  components: {
    AppHeader,
    AppFooter,
    ToastsGroup,
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
  mounted() {
    this.$websocket();
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
