<template>
  <ul :class="styles.statsList">
    <li v-if="formattedStarsCount" :class="styles.statItem">
      <icon-star
        :class="[styles.icon, styles.iconStar]"
        width="16"
        height="16"
        aria-hidden="true"
      />
      <the-text :class="styles.statText" tag="span">
        {{ formattedStarsCount }}
      </the-text>
    </li>
    <li v-if="formattedIssuesCount" :class="styles.statItem">
      <icon-issue
        :class="styles.icon"
        width="16"
        height="16"
        aria-hidden="true"
      />
      <the-text :class="styles.statText" tag="span">
        {{ formattedIssuesCount }}
      </the-text>
    </li>
    <li v-if="formattedForksCount" :class="styles.statItem">
      <fork-icon
        :class="[styles.icon, styles.iconFork]"
        width="16"
        height="16"
        aria-hidden="true"
      />
      <the-text :class="styles.statText" tag="span">
        {{ formattedForksCount }}
      </the-text>
    </li>
  </ul>
</template>

<script>
import styles from './RepoStats.css?module';
import TheText from '@/src/components/TheText/TheText';
import getShortNumberFormat from '@/src/lib/getShortNumberFormat';
import IconStar from '@/src/components/Icons/IconStar';
import IconIssue from '@/src/components/Icons/IconIssue';
import ForkIcon from '@/src/components/Icons/ForkIcon';

export default {
  components: {
    TheText,
    IconIssue,
    IconStar,
    ForkIcon,
  },
  props: {
    openIssuesCount: {
      type: Number,
      default: 0,
    },
    starsCount: {
      type: Number,
      default: 0,
    },
    forksCount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    styles() {
      return styles;
    },
    formattedIssuesCount() {
      return getShortNumberFormat(this.$props.openIssuesCount);
    },
    formattedStarsCount() {
      return getShortNumberFormat(this.$props.starsCount);
    },
    formattedForksCount() {
      return getShortNumberFormat(this.$props.forksCount);
    },
  },
};
</script>
