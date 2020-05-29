<template>
  <header :class="styles.header">
    <div :class="styles.headerWrapper">
      <nuxt-link to="/" :class="styles.logo" title="Go to the main page">
        <logo width="56" height="21" />
        <span :class="styles.logoLabel">Open Widen</span>
      </nuxt-link>

      <nav :class="styles.headerNav" role="navigation">
        <div :class="em('navWrapper')({ mobile: true })">
          <ul v-if="!user" :class="styles.headerNavList">
            <li :class="styles.headerNavItem">
              <the-button
                title="Choose the provider to sign in with"
                :on-click="openSidebar"
              >
                Sign in
              </the-button>
            </li>
          </ul>

          <ul v-else :class="styles.headerNavList">
            <li :class="styles.headerNavItem">
              <button
                :class="styles.avatarButton"
                title="Open mobile menu"
                @click="openSidebar"
              >
                <avatar />
              </button>
            </li>
          </ul>
        </div>

        <div :class="em('navWrapper')({ desktop: true })">
          <ul v-if="!user" :class="styles.headerNavList">
            <clicked-outside :on-click-outside="closeSuggest">
              <li :class="styles.headerNavItem">
                <the-button
                  :class="styles.headerNavLink"
                  title="Choose the provider to sign in with"
                  :on-click="toggleSuggest"
                >
                  Sign in
                </the-button>

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
                <avatar :class="styles.avatar" />
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
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import cssmem from 'cssmem';
import styles from './TopHeader.css?module';
import Logo from '@/src/components/Logo/Logo.vue';
import TheButton from '@/src/components/TheButton/TheButton';
import { isMobile } from '@/src/lib/adaptive';
import { loginUser } from '@/src/lib/loginUser';
import ClickedOutside from '@/src/components/ClickedOutside/ClickedOutside';
import Avatar from '@/src/components/Avatar/Avatar';

const em = cssmem(styles);

export default {
  components: {
    Logo,
    ClickedOutside,
    TheButton,
    Avatar,
  },
  props: {
    openSidebar: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      em,
      isMobile: false,
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
  mounted() {
    if (window) this.isMobile = isMobile();
  },
  methods: {
    toggleSuggest() {
      this.isSuggestOpen = !this.isSuggestOpen;
    },
    closeSuggest() {
      this.isSuggestOpen = false;
    },
    login(provider) {
      loginUser(provider, this.$axios.defaults.baseURL, this.$store.dispatch);
    },
    logout() {
      this.$store.dispatch('logoutUser');
    },
  },
};
</script>
