<template>
  <div :class="styles.preloaderContainer" aria-hidden="true">
    <div :class="styles.preloader">
      <div :class="styles.preloaderCircle" />
      <div :class="styles.preloaderCircle" />
      <div :class="styles.preloaderCircle" />
      <div :class="styles.preloaderCircle" />
    </div>
  </div>
</template>

<script>
import styles from './Preloader.css?module';

export default {
  computed: {
    styles() {
      return styles;
    },
  },
};
</script>
