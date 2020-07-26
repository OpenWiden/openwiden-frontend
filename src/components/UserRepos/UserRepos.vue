<template>
  <div :class="styles.addRepoBlock">
    <the-text tag="h2" size="h3">
      GitHub
    </the-text>

    <table :class="styles.table">
      <tr
        v-for="repo in getGitHubRepos"
        :key="repo.name"
        :class="styles.tableRow"
      >
        <td :class="[styles.tableCell, styles.repoName]">
          {{ repo.name }}
        </td>

        <td :class="styles.tableCell">
          <repo-stats v-bind="repo" />
        </td>

        <td :class="[styles.tableCell, styles.status]">
          <repo-status :status="repo.status" />
        </td>

        <td :class="styles.tableCell">
          <the-button
            :class="styles.button"
            :is-transparent="repo.status === 'added'"
            :is-loading="repo.status === 'pending'"
            :disabled="repo.status === 'pending'"
            :on-click="() => onClick(repo.status)(repo.id)"
            :title="
              repo.isAdded
                ? 'Remove repostiroty from our service'
                : 'Add repostiroty to our service'
            "
          >
            {{ repo.status === 'added' ? 'Remove' : 'Add' }}
          </the-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
// import cssmem from 'cssmem';
import styles from './UserRepos.css?module';
import TheButton from '@/src/components/TheButton/TheButton';
import TheText from '@/src/components/TheText/TheText';
import RepoStatus from '@/src/components/RepoStatus/RepoStatus';
import RepoStats from '@/src/components/RepoStats/RepoStats';

export default {
  components: {
    TheText,
    RepoStatus,
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
      return this.repos.filter(({ vcs }) => vcs === 'github');
    },
    styles() {
      return styles;
    },
  },
  methods: {
    changeRepoStatus(id, nextStatus) {
      this.repos.find((item, index) => {
        if (item.id === id) {
          this.$set(this.repos, index, { ...item, status: nextStatus });
        }
      });
    },
    addRepository(id) {
      this.changeRepoStatus(id, 'pending');

      this.$api.addUserRepository(id).then(() => {
        this.changeRepoStatus(id, 'added');
      });
    },

    removeRepository(id) {
      this.changeRepoStatus(id, 'pending');

      this.$api.removeUserRepository(id).then(() => {
        this.changeRepoStatus(id, 'initial');
      });
    },
    onClick(status) {
      return status === 'added' ? this.removeRepository : this.addRepository;
    },
  },
};
</script>
