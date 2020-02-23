<template>
  <header class="header">
    <div class="header__wrapper">
      <nuxt-link to="/" class="logo">
        <logo width="56" height="21" />
        <span class="logo__text">Open Widen</span>
      </nuxt-link>
    </div>
  </header>
</template>

<script>
import Logo from '@/src/components/Logo/Logo.vue';

export default {
  components: {
    Logo,
  },
};
</script>

<style>
.header {
  display: flex;
  align-items: center;
  min-height: 51px;
  background-color: var(--dark-theme-secondary-bg);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12), 0px 4px 4px rgba(0, 0, 0, 0.24);
}

.header__wrapper {
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  max-width: 1200px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo__text {
  margin: 4px 0 0 10px;
  font-size: 20px;
  font-weight: bold;
  color: var(--dark-theme-primary-typo);
}
</style>
