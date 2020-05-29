<template>
  <div>
    <sidebar :is-sidebar-open="isSidebarOpen" :close-sidebar="closeSidebar">
      <top-header :open-sidebar="openSidebar" />
      <main class="main" role="main">
        <nuxt />
      </main>
      <the-footer />
    </sidebar>
  </div>
</template>

<script>
import TopHeader from '@/src/components/TopHeader/TopHeader';
import TheFooter from '@/src/components/TheFooter/TheFooter';
import Sidebar from '@/src/components/Sidebar/Sidebar';

export default {
  components: {
    TopHeader,
    TheFooter,
    Sidebar,
  },
  data() {
    return {
      isSidebarOpen: false,
    };
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
  methods: {
    openSidebar() {
      this.isSidebarOpen = true;

      document.body.style.overflowY = 'hidden';
    },
    closeSidebar() {
      this.isSidebarOpen = false;

      document.body.style.overflowY = null;
    },
  },
};
</script>

<style>
.main {
  min-height: 100vh;
}
</style>
