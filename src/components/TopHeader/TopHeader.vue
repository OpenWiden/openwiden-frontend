<template>
  <header :class="styles.header">
    <div :class="styles.headerWrapper">
      <nuxt-link to="/" class="logo">
        <logo width="56" height="21" />
        <span :class="styles.logoText">Open Widen</span>
      </nuxt-link>

      <nav :class="styles.headerNav" role="navigation">
        <ul :class="styles.headerNavList">
          <li :class="styles.headerNavItem">
            <a :class="styles.headerNavLink" href="#">Sign In</a>
          </li>
          <li :class="styles.headerNavItem">
            <a :class="styles.headerNavLink" href="#">Sign Up</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import styles from './TopHeader.css?module';
import Logo from '@/src/components/Logo/Logo.vue';

export default {
  components: {
    Logo,
  },
  computed: {
    styles() {
      return styles;
    },
  },
};
</script>
