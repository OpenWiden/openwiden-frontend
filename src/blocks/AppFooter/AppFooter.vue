<template>
  <footer :class="styles.footer" role="contentinfo">
    <div :class="styles.wrapper">
      <the-text :class="styles.copyrightText" tag="p">
        © OpenWiden 2020
      </the-text>
    </div>
  </footer>
</template>

<script>
import styles from './AppFooter.css?module';
import TheText from '@/src/components/TheText/TheText';

export default {
  components: {
    TheText,
  },
  computed: {
    styles() {
      return styles;
    },
  },
};
</script>
