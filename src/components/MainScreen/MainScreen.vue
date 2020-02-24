<template>
  <section :class="styles.introduction">
    <div :class="styles.introductionWrapper">
      <the-text :class="styles.introductionTitle" tag="h1">
        Help out your favorite open source projects and become a better
        developer while doing it
      </the-text>
      <the-text :class="styles.introductionDescription">
        Find repos you would like to help. Fix the issues and everybody wins
      </the-text>
    </div>
  </section>
</template>

<script>
import styles from './MainScreen.css?module';
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
