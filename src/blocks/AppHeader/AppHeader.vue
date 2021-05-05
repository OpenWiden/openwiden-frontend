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
                  <li
                    v-for="provider in providers"
                    :key="provider.name"
                    :class="styles.suggestItem"
                  >
                    <a
                      :class="styles.suggestLink"
                      href="#"
                      @click.prevent="login(provider.name)"
                    >
                      {{ provider.label }}
                      <img
                        :class="styles.suggestItemIcon"
                        :src="provider.icon"
                        :alt="`${provider.label} logo`"
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
            <n-link
              :class="styles.headerNavLink"
              href="#"
              to="/repos/my_repos/"
            >
              Submit repo
            </n-link>
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
import styles from './AppHeader.css?module';
import Logo from '@/src/components/Logo/Logo.vue';
import ClickedOutside from '@/src/components/ClickedOutside/ClickedOutside';
import loginUser from '@/src/lib/loginUser';

export default {
  components: {
    Logo,
    ClickedOutside,
  },
  data() {
    return {
      isSuggestOpen: false,
      providers: [
        {
          name: 'github',
          label: 'GitHub',
          icon: require('@/assets/svgs/github-logo.svg'),
        },
        {
          name: 'gitlab',
          label: 'GitLab',
          icon: require('@/assets/svgs/gitlab-logo.svg'),
        },
      ],
    };
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
      this.$store.dispatch('logoutUser');

      window.location = window.location.origin;
    },
    login(vsc) {
      const { $axios, $store } = this;
      loginUser(vsc, $axios.defaults.baseURL, $store.dispatch);
    },
  },
};
</script>
