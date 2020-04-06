<template>
  <a :class="styles.repoCard" href="#">
    <div :class="styles.repoCardHeader">
      <the-text :class="styles.repoCardTitle" tag="p">{{
        repository.name
      }}</the-text>
    </div>
    <div :class="styles.repoCardStats">
      <ul :class="styles.statsList">
        <li v-if="starCount" :class="styles.statItem">
          <icon-star
            :class="[styles.icon, styles.iconStar]"
            width="16"
            height="16"
            aria-hidden="true"
          />
          <the-text :class="styles.statText" tag="span">
            {{ starCount }}
          </the-text>
        </li>
        <li v-if="openIssuesCount" :class="styles.statItem">
          <icon-issue
            :class="styles.icon"
            width="16"
            height="16"
            aria-hidden="true"
          />
          <the-text :class="styles.statText" tag="span">
            {{ openIssuesCount }}
          </the-text>
        </li>
      </ul>
    </div>
    <div :class="styles.repoCardDescription">
      <the-text tag="p">
        {{ description }}
      </the-text>
    </div>
  </a>
</template>

<script>
import styles from './RepoCard.css?module';
import TheText from '@/src/components/TheText/TheText';
import IconStar from '@/src/components/Icons/IconStar';
import IconIssue from '@/src/components/Icons/IconIssue';

function getShortNumberFormat(number) {
  const million = 1000000;
  const thousand = 1000;

  if (!number || number < 0) {
    return null;
  }

  if (number >= million) {
    return (number / million).toFixed(1) + 'm';
  }

  if (number >= thousand) {
    return (number / thousand).toFixed(1) + 'k';
  }

  return number;
}

export default {
  components: {
    TheText,
    IconStar,
    IconIssue,
  },
  props: {
    repository: {
      type: Object,
      default: null,
    },
  },
  computed: {
    styles() {
      return styles;
    },
    openIssuesCount() {
      return getShortNumberFormat(this.$props.repository.open_issues_count);
    },
    starCount() {
      return getShortNumberFormat(this.$props.repository.star_count);
    },
    description() {
      const {
        repository: { description },
      } = this.$props;

      const words = description.split(/\s/);
      const MAX_WORDS = 40;

      if (words.length >= MAX_WORDS) {
        return words.slice(0, MAX_WORDS).join(' ') + '...';
      }

      return description;
    },
  },
};
</script>
