<template>
  <section :class="styles.introduction">
    <div :class="styles.wrapper">
      <div :class="styles.text">
        <the-text :class="styles.title" tag="h1">
          Help out your favorite open source projects and become a better
          developer while doing it
        </the-text>
        <the-text :class="styles.subtitle">
          Find repos you would like to help. Fix the issues and everybody wins
        </the-text>
      </div>

      <issues-svg
        width="438"
        height="324"
        aria-hidden="true"
        aria-title="Github issues illustration"
      />
    </div>
  </section>
</template>

<script>
import styles from './MainScreen.css?module';
import IssuesSvg from './IssuesSvg';
import TheText from '@/src/components/TheText/TheText';

export default {
  components: {
    TheText,
    IssuesSvg,
  },
  computed: {
    styles() {
      return styles;
    },
  },
};
</script>
