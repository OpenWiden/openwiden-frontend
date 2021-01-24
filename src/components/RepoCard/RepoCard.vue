<template>
  <nuxt-link :class="styles.card" :to="`/repo/${repository.id}`">
    <div :class="styles.header">
      <the-text :class="styles.title" tag="p">
        {{ repository.name }}
      </the-text>
      <repo-lang
        :class="styles.lang"
        :programming-language="programmingLanguage"
      />
    </div>
    <div :class="styles.stats">
      <repo-stats v-bind="repository" />
    </div>
    <div :class="styles.description">
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
import getRepoProgrammingLanguage from '@/src/lib/getRepoProgrammingLanguage';

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
    programmingLanguage() {
      return getRepoProgrammingLanguage(this.$props.repository);
    },
  },
};
</script>
