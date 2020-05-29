<template>
  <div>
    <clicked-outside :on-click-outside="closeSidebar">
      <div :class="em('wrapper')({ visible: isSidebarOpen })">
        <div
          :class="em('overlay')({ visible: isSidebarOpen })"
          @click="closeSidebar"
        />

        <aside :class="em('sidebar')({ visible: isSidebarOpen })">
          <nav :class="styles.contentWrapper" role="navigation">
            <div v-if="!user">
              <span :class="styles.title">Sign in</span>

              <div :class="styles.block">
                <ul>
                  <li v-for="provider in providers" :key="provider.name">
                    <a
                      :class="[styles.navItem, styles.navLink]"
                      :title="`Sing in with ${provider.name}`"
                      href="#"
                      @click.prevent="login(provider.name)"
                    >
                      <img
                        :class="styles.icon"
                        :src="provider.icon"
                        :alt="`${provider.label} logo`"
                        width="24"
                        height="24"
                      />
                      {{ provider.label }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div v-else>
              <div :class="[styles.block, styles.userInfo]">
                <avatar :class="styles.avatar" />
                <div :class="styles.userInfoTexts">
                  <the-text :class="styles.userName" tag="span">
                    {{ user.firstName }} {{ user.lastName }}
                  </the-text>
                  <the-text tag="span">
                    {{ user.email }}
                  </the-text>
                </div>
              </div>

              <div :class="styles.block">
                <ul>
                  <li>
                    <a :class="[styles.navItem, styles.navLink]" href="#">
                      Submit repo
                    </a>
                  </li>
                  <li>
                    <button
                      :class="[styles.navItem, styles.navLink]"
                      type="button"
                      @click="logout"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </aside>
      </div>

      <slot />
    </clicked-outside>
  </div>
</template>

<script>
import cssmem from 'cssmem';
import styles from './Sidebar.css?module';
import ClickedOutside from '@/src/components/ClickedOutside/ClickedOutside';
import TheText from '@/src/components/TheText/TheText';
import Avatar from '@/src/components/Avatar/Avatar';
import { loginUser } from '@/src/lib/loginUser';

const em = cssmem(styles);

export default {
  components: {
    ClickedOutside,
    TheText,
    Avatar,
  },
  props: {
    isSidebarOpen: {
      type: Boolean,
      default: false,
    },
    closeSidebar: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      em,
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
    login(provider) {
      loginUser(provider, this.$axios.defaults.baseURL, this.$store.dispatch);
    },
    logout() {
      this.$store.dispatch('logoutUser');
    },
  },
};
</script>
