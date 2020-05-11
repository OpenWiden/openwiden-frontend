<template>
  <nuxt-link :class="styles.repoCard" :to="`/repo/${repository.id}`">
    <div :class="styles.repoCardHeader">
      <the-text :class="styles.repoCardTitle" tag="p">
        {{ repository.name }}
      </the-text>
      <repo-lang :programming-language="repository.programmingLanguage" />
    </div>
    <div :class="styles.repoCardStats">
      <repo-stats v-bind="repository" />
    </div>
    <div :class="styles.repoCardDescription">
      <the-text tag="p">
        {{ description }}
      </the-text>
    </div>
  </nuxt-link>
</template>

<script>
import styles from './RepoCard.css?module';
import TheText from '@/src/components/TheText/TheText';
import RepoLang from '@/src/components/RepoLang/RepoLang';
import RepoStats from '@/src/components/RepoStats/RepoStats';
import getShortStringFormat from '@/src/lib/getShortStringFormat';

const MAX_DESCRIPTION_SYMBOLS = 40;

export default {
  components: {
    TheText,
    RepoStats,
    RepoLang,
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
    description() {
      return getShortStringFormat(
        this.$props.repository.description,
        MAX_DESCRIPTION_SYMBOLS
      );
    },
  },
};
</script>
