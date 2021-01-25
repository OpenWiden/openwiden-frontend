<template>
  <section :class="styles.introduction">
    <div :class="styles.wrapper">
      <div :class="styles.text">
        <the-text :class="styles.title" tag="h1">
          Help out open source projects and become a&nbsp;better developer while
          doing&nbsp;it
        </the-text>
        <the-text :class="styles.subtitle">
          Find repos you would like to help. Fix the issues and everybody wins
        </the-text>

        <ul :class="styles.buttonsList">
          <li :class="styles.buttonItem">
            <the-button title="Find a repository">Find repository</the-button>
          </li>
          <li :class="styles.buttonItem">
            <the-button
              :is-transparent="true"
              title="Visit your repositories page "
            >
              My repositories
            </the-button>
          </li>
        </ul>
      </div>

      <div :class="styles.issuesSvg">
        <issues-svg
          width="438"
          height="324"
          aria-hidden="true"
          aria-title="Github issues illustration"
        />
      </div>
    </div>
  </section>
</template>

<script>
import styles from './MainScreen.css?module';
import IssuesSvg from './IssuesSvg';
import TheText from '@/src/components/TheText/TheText';
import TheButton from '@/src/components/TheButton/TheButton';

export default {
  components: {
    TheText,
    IssuesSvg,
    TheButton,
  },
  computed: {
    styles() {
      return styles;
    },
  },
};
</script>
