<template>
  <div :class="[styles.repo, styles[repo.state]]">
    <div :class="styles.repoBlock">
      <img
        :class="styles.repoVCS"
        :src="require(`@/assets/svgs/${repo.vcs}-logo.svg`)"
        :alt="`${repo.vcs} repository`"
        width="28"
        height="28"
      />

      <div :class="styles.repoName">
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
      </div>
    </div>

    <div :class="styles.repoBlock">
      <repo-stats :class="styles.repoStats" v-bind="repo" />
    </div>

    <div :class="styles.repoBlock">
      <repo-state :class="styles.repoState" :state="repo.state" />

      <the-button
        :class="styles.actionButton"
        :is-transparent="isRepoAdded"
        :is-loading="isButtonDisabled"
        :disabled="isButtonDisabled"
        :on-click="() => onClick(repo.state)(repo.id)"
        :aria-label="actionBtnLabel"
        :title="actionBtnLabel"
      >
        <delete-icon v-if="isRepoAdded" size="18" />
        <add-icon v-else size="18" />
      </the-button>
    </div>
  </div>
</template>

<script>
import TheButton from '@/src/components/TheButton/TheButton';
import TheText from '@/src/components/TheText/TheText';
import RepoState from '@/src/components/RepoState/RepoState';
import RepoStats from '@/src/components/RepoStats/RepoStats';
import DeleteIcon from '@/src/components/Icons/DeleteIcon';
import AddIcon from '@/src/components/Icons/AddIcon';
// eslint-disable-next-line import/order
import styles from './UserRepo.css?module';

export default {
  components: {
    TheText,
    RepoState,
    TheButton,
    DeleteIcon,
    AddIcon,
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
    actionBtnLabel() {
      const { repo } = this.$props;

      if (this.isRepoAdded) return `Remove ${repo.name} from OpenWiden`;

      return `Add ${repo.name} to OpenWiden`;
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
