<template>
  <header :class="styles.header">
    <div :class="styles.headerWrapper">
      <nuxt-link to="/" :class="styles.logo">
        <logo width="56" height="21" />
        <span :class="styles.logoText">Open Widen</span>
      </nuxt-link>

      <nav :class="styles.headerNav" role="navigation">
        <ul v-if="!user" :class="styles.headerNavList">
          <clicked-outside :on-click-outside="closeSuggest">
            <li :class="styles.headerNavItem">
              <button
                :class="styles.headerNavLink"
                title="Sign in"
                @click="toggleSuggest"
              >
                Sign in
              </button>

              <div v-if="isSuggestOpen" :class="styles.suggest">
                <ul :class="styles.suggestList">
                  <li :class="styles.suggestItem">
                    <a
                      :class="styles.suggestLink"
                      href="#"
                      @click.prevent="login('github')"
                    >
                      GitHub
                      <img
                        :class="styles.suggestItemIcon"
                        src="~assets/svgs/github-logo.svg"
                        alt="GitHub Logo"
                      />
                    </a>
                  </li>
                  <li :class="styles.suggestItem">
                    <a
                      :class="styles.suggestLink"
                      href="#"
                      @click.prevent="login('gitlab')"
                    >
                      GitLab
                      <img
                        :class="styles.suggestItemIcon"
                        src="~assets/svgs/gitlab-logo.svg"
                        alt="GitLub Logo"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </clicked-outside>
        </ul>

        <ul v-else :class="styles.headerNavList">
          <li :class="styles.headerNavItem">
            <a :class="styles.headerNavLink" href="#">
              <img
                :class="styles.avatar"
                :src="user.avatar"
                :alt="user.username"
              />
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

<script>
import cookie from 'js-cookie';
import styles from './TopHeader.css?module';
import Logo from '@/src/components/Logo/Logo.vue';
import ClickedOutside from '@/src/components/ClickedOutside/ClickedOutside';
import { MUTATIONS } from '@/store/mutationTypes';

export default {
  components: {
    Logo,
    ClickedOutside,
  },
  data() {
    return { isSuggestOpen: false };
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
    toggleSuggest() {
      this.isSuggestOpen = !this.isSuggestOpen;
    },
    closeSuggest() {
      this.isSuggestOpen = false;
    },
    logout() {
      cookie.remove('auth');
      cookie.remove('refresh');
      cookie.remove('provider');
      this.$store.commit(MUTATIONS.RESET_AUTH);
    },
    login(provider) {
      const loginUrl = new URL(
        `auth/login/${provider}/`,
        this.$axios.defaults.baseURL
      );

      this.$store.commit(MUTATIONS.SET_PROVIDER, provider);

      loginUrl.searchParams.set('redirect_uri', window.location.href);

      window.location.href = loginUrl.toString();
    },
  },
};
</script>
