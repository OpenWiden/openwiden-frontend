<template>
  <section :class="styles.addRepoBlock">
    <!-- Preloader -->
    <ul v-if="loadingStatus" :class="styles.reposList">
      <li
        v-for="index in reposSkeletons"
        :key="index"
        :class="[styles.repo, styles.loadingRepo]"
      >
        <user-repo-skeleton />
      </li>
    </ul>

    <!-- Content -->
    <ul v-else :class="styles.reposList">
      <li v-for="repo in getGitHubRepos" :key="repo.name" :class="styles.repo">
        <user-repo :on-click="onClick" :repo="repo" />
      </li>
    </ul>
  </section>
</template>

<script>
import styles from './UserRepos.css?module';
import { events } from './events';
import UserRepo from '@/src/components/UserRepo/UserRepo';
import UserRepoSkeleton from '@/src/components/UserRepo/UserRepoSkeleton';

export default {
  components: {
    UserRepo,
    UserRepoSkeleton,
  },

  props: {
    loadingStatus: {
      type: Boolean,
      default: () => true,
    },
    repos: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      reposSkeletons: 10,
    };
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
  mounted() {
    events.$on('update', ({ id, state }) => {
      this.changeRepoState(id, state);
    });
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

      this.$api.addUserRepository(id);
    },

    removeRepository(id) {
      this.changeRepoState(id, 'removing');

      this.$api.removeUserRepository(id);
    },
    onClick(state) {
      return state === 'added' ? this.removeRepository : this.addRepository;
    },
  },
};
</script>
