<template>
  <nuxt-link :class="styles.repoCard" :to="`/repo/${repository.id}`">
    <div :class="styles.repoCardHeader">
      <the-text :class="styles.repoCardTitle" tag="p">
        {{ repository.name }}
      </the-text>
      <img
        v-if="lang"
        :src="lang.icon"
        :alt="lang.name"
        width="24"
        height="24"
      />
    </div>
    <div :class="styles.repoCardStats">
      <ul :class="styles.statsList">
        <li v-if="starsCount" :class="styles.statItem">
          <icon-star
            :class="[styles.icon, styles.iconStar]"
            width="16"
            height="16"
            aria-hidden="true"
          />
          <the-text :class="styles.statText" tag="span">
            {{ starsCount }}
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
        <li v-if="forksCount" :class="styles.statItem">
          <fork-icon
            :class="[styles.icon, styles.iconFork]"
            width="16"
            height="16"
            aria-hidden="true"
          />
          <the-text :class="styles.statText" tag="span">
            {{ forksCount }}
          </the-text>
        </li>
      </ul>
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
import IconStar from '@/src/components/Icons/IconStar';
import IconIssue from '@/src/components/Icons/IconIssue';
import ForkIcon from '@/src/components/Icons/ForkIcon';
import getShortNumberFormat from '@/src/lib/getShortNumberFormat';
import getShortStringFormat from '@/src/lib/getShortStringFormat';

const MAX_WORDS = 40;

export default {
  components: {
    TheText,
    IconStar,
    IconIssue,
    ForkIcon,
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
      return getShortNumberFormat(this.$props.repository.openIssuesCount);
    },
    starsCount() {
      return getShortNumberFormat(this.$props.repository.starsCount);
    },
    forksCount() {
      return getShortNumberFormat(this.$props.repository.forksCount);
    },
    description() {
      return getShortStringFormat(
        this.$props.repository.description,
        MAX_WORDS
      );
    },
    lang() {
      const {
        programmingLanguage: { name },
      } = this.$props.repository;

      try {
        return {
          icon: require(`@/assets/svgs/prog-languages/${name}.svg`),
          name,
        };
      } catch (err) {
        return null;
      }
    },
  },
};
</script>
