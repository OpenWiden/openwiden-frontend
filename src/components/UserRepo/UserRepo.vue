<template>
  <div :class="[styles.repo, styles[repo.state]]">
    <img
      :class="styles.vcsIcon"
      :src="require(`@/assets/svgs/${repo.vcs}-logo.svg`)"
      :alt="`${repo.vcs} repository`"
      width="30"
      height="30"
    />

    <div>
      <template>
        <nuxt-link
          v-if="isRepoAdded"
          :to="`/repo/${repo.id}`"
          title="Go to repository profile page"
        >
          {{ repo.name }}
        </nuxt-link>

        <the-text v-else tag="p">
          {{ repo.name }}
        </the-text>
      </template>

      <repo-stats
        :class="styles.stats"
        :open-issues-count="repo.openIssuesCount"
        :stars-count="repo.starsCount"
        :forks-count="repo.forksCount"
      />
    </div>

    <div :class="styles.controls">
      <repo-state :class="styles.repoState" :state="repo.state" />

      <the-button
        :class="styles.button"
        :is-transparent="isRepoAdded"
        :is-loading="isButtonDisabled"
        :disabled="isButtonDisabled"
        :on-click="() => onClick(repo.state)(repo.id)"
        :title="
          isRepoAdded
            ? 'Remove repostiroty from OpenWiden service'
            : 'Add repostiroty to OpenWiden service'
        "
      >
        {{ isRepoAdded ? 'Remove' : 'Add' }}
      </the-button>
    </div>
  </div>
</template>

<script>
import TheButton from '@/src/components/TheButton/TheButton';
import TheText from '@/src/components/TheText/TheText';
import RepoState from '@/src/components/RepoState/RepoState';
import RepoStats from '@/src/components/RepoStats/RepoStats';
// eslint-disable-next-line import/order
import styles from './UserRepo.css?module';

export default {
  components: {
    TheText,
    RepoState,
    TheButton,
    RepoStats,
  },

  props: {
    loadingStatus: {
      type: Boolean,
      default: () => true,
    },
    repo: {
      type: Object,
      default: () => null,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    isRepoAdded() {
      const { repo } = this.$props;

      return repo.state === 'added';
    },
    isButtonDisabled() {
      const { repo } = this.$props;

      return repo.state === 'adding' || repo.state === 'removing';
    },
    styles() {
      return styles;
    },
  },
};
</script>
