<template>
  <header :class="styles.header">
    <div :class="styles.headerWrapper">
      <nuxt-link to="/" class="logo">
        <logo width="56" height="21" />
        <span :class="styles.logoText">Open Widen</span>
      </nuxt-link>

      <nav :class="styles.headerNav" role="navigation">
        <ul v-if="$store.state.user === null" :class="styles.headerNavList">
          <li :class="styles.headerNavItem">
            <a :class="styles.headerNavLink" @click.prevent="login('github')">
              Sign In
            </a>
          </li>

          <li :class="styles.headerNavItem">
            <a :class="styles.headerNavLink" href="#">Sign Up</a>
          </li>
        </ul>

        <ul v-else :class="styles.headerNavList">
          <li :class="styles.headerNavItem">
            <a :class="styles.headerNavLink" href="#">
              {{ user.username }}
            </a>
          </li>
          <li :class="styles.headerNavItem">
            <a :class="styles.headerNavLink" href="#">
              Submit repo
            </a>
          </li>
          <li :class="styles.headerNavItem">
            <button :class="styles.headerNavLink" @click="logout">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import cookie from 'js-cookie';
import styles from './TopHeader.css?module';
import Logo from '@/src/components/Logo/Logo.vue';
import { MUTATIONS } from '@/store/mutationTypes';

export default {
  components: {
    Logo,
  },
  computed: {
    styles() {
      return styles;
    },
    user({ $store }) {
      return $store.state.user;
    },
  },
  methods: {
    logout() {
      cookie.remove('auth');
      cookie.remove('refresh');
      this.$store.commit(MUTATIONS.RESET_AUTH);
    },
    login(provider) {
      const loginUrl = new URL(
        `auth/login/${provider}/`,
        'https://openwiden-staging.herokuapp.com'
      );

      this.$store.commit(MUTATIONS.SET_PROVIDER, provider);

      loginUrl.searchParams.set('redirect_uri', window.location.href);

      window.location.href = loginUrl.toString();
    },
  },
};
</script>
