<template>
  <div :class="styles.preloaderContainer" aria-hidden="true">
    <ul :class="styles.preloader">
      <li
        v-for="index in 4"
        :key="index"
        :class="styles.preloaderCircle"
        :style="style"
      />
    </ul>
  </div>
</template>

<script>
import styles from './Preloader.css?module';

export default {
  props: {
    width: {
      type: String,
      default: '8',
    },
    height: {
      type: String,
      default: '8',
    },
  },
  computed: {
    styles() {
      return styles;
    },
    style() {
      const { width, height } = this.$props;

      return { width: `${width}px`, height: `${height}px` };
    },
  },
};
</script>
