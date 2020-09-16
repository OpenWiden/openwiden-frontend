<template>
  <section :class="styles.addRepoBlock">
    <the-text tag="h2" size="h3">
      GitHub
    </the-text>

    <ul :class="styles.repoList">
      <li v-for="repo in getGitHubRepos" :key="repo.name" :class="styles.repo">
        <div :class="[styles.repoCell, styles.repoName]">
          {{ repo.name }}
        </div>

        <div :class="styles.repoCell">
          <repo-stats v-bind="repo" />
        </div>

        <div :class="[styles.repoCell, styles.state]">
          <repo-state :state="repo.state" />
        </div>

        <div :class="styles.repoCell">
          <the-button
            :class="styles.button"
            :is-transparent="repo.state === 'added'"
            :is-loading="repo.state === 'adding' || repo.state === 'removing'"
            :disabled="repo.state === 'adding' || repo.state === 'removing'"
            :on-click="() => onClick(repo.state)(repo.id)"
            :title="
              repo.state === 'added'
                ? 'Remove repostiroty from OpenWiden service'
                : 'Add repostiroty to OpenWiden service'
            "
          >
            {{ repo.state === 'added' ? 'Remove' : 'Add' }}
          </the-button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
// import cssmem from 'cssmem';
import styles from './UserRepos.css?module';
import TheButton from '@/src/components/TheButton/TheButton';
import TheText from '@/src/components/TheText/TheText';
import RepoState from '@/src/components/RepoState/RepoState';
import RepoStats from '@/src/components/RepoStats/RepoStats';

export default {
  components: {
    TheText,
    RepoState,
    TheButton,
    RepoStats,
  },

  props: {
    repos: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    getGitHubRepos() {
      if (!this.repos) return [];
      return this.repos.filter(({ vcs }) => vcs === 'github');
    },
    styles() {
      return styles;
    },
  },
  methods: {
    changeRepoState(id, nextState) {
      this.repos.find((item, index) => {
        if (item.id === id) {
          this.$set(this.repos, index, { ...item, state: nextState });
        }
      });
    },
    addRepository(id) {
      this.changeRepoState(id, 'adding');

      this.$api.addUserRepository(id).then(() => {
        this.changeRepoState(id, 'added');
      });
    },

    removeRepository(id) {
      this.changeRepoState(id, 'removing');

      this.$api.removeUserRepository(id).then(() => {
        this.changeRepoState(id, 'initial');
      });
    },
    onClick(state) {
      return state === 'added' ? this.removeRepository : this.addRepository;
    },
  },
};
</script>
