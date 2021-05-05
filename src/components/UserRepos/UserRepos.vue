<template>
  <section :class="styles.addRepoBlock">
    <!-- Preloader -->
    <!-- <ul v-if="loadingStatus" :class="styles.reposList">
      <li
        v-for="index in reposSkeletons"
        :key="index"
        :class="[styles.repo, styles.loadingRepo]"
      >
        <user-repo-skeleton />
      </li>
    </ul> -->

    <!-- Content -->
    <template>
      <transition-group
        tag="ul"
        :class="styles.reposList"
        appear
        @before-enter="beforeEnter"
        @enter="enter"
      >
        <li
          v-for="(repo, index) in getGitHubRepos"
          :key="repo.name"
          :class="styles.repo"
          :data-index="index"
        >
          <user-repo :on-click="handleClick" :repo="repo" />
        </li>
      </transition-group>
    </template>

    <pagination
      :pagination="pagination"
      :wrapper-class="styles.pagination"
      :on-click="getRepos"
    />
  </section>
</template>

<script>
import gsap from 'gsap';
import styles from './UserRepos.css?module';
import { events } from './events';
import UserRepo from '@/src/components/UserRepo/UserRepo';
import Pagination from '@/src/components/Pagination/Pagination';
// import UserRepoSkeleton from '@/src/components/UserRepo/UserRepoSkeleton';
import { DATA_STATUS, DEFAULT_DATA_OBJECT } from '@/src/interfaces/Data';

export default {
  components: {
    UserRepo,
    Pagination,
    // UserRepoSkeleton,
  },

  props: {},
  data() {
    return {
      repos: DEFAULT_DATA_OBJECT,
      reposSkeletons: 10,
      pagination: {
        previous: null,
        next: null,
      },
    };
  },
  computed: {
    getGitHubRepos() {
      if (!this.repos.data) return [];
      return this.repos.data.filter(({ vcs }) => vcs === 'github');
    },
    styles() {
      return styles;
    },
  },
  created() {
    this.getRepos();
  },
  mounted() {
    events.$on('update', this.updateRepo);
  },
  unmounted() {
    events.$off('update', this.updateRepo);
  },
  methods: {
    beforeEnter(el) {
      el.style.transform = 'translateY(100px)';
      el.style.opacity = 0;
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2 * el.dataset.index,
        onComplete: done,
      });
    },
    updateRepo({ id, state }) {
      this.changeRepoState(id, state);
    },
    changeRepoState(id, nextState) {
      this.repos.data.find((item, index) => {
        if (item.id === id) {
          this.$set(this.repos.data, index, { ...item, state: nextState });
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
    handleClick(state) {
      // TODO: Maybe make this as $event?
      return state === 'added' ? this.removeRepository : this.addRepository;
    },
    getRepos(url) {
      const { repos, $api } = this;

      repos.loadingStatus = DATA_STATUS.LOADING;

      $api
        .getUserRepositories(url)
        .then((response) => {
          const { results, next, previous } = response;

          if (!results.length) {
            repos.loadingStatus = DATA_STATUS.IDLE;
            return;
          }

          repos.data = results.sort((a) => (a.status === 'added' ? -1 : 1));
          repos.loadingStatus = DATA_STATUS.LOADED;

          this.pagination.next = next;
          this.pagination.previous = previous;
        })
        .catch((err) => {
          repos.loadingStatus = DATA_STATUS.FAILED;
          repos.errorText = err.message;
        });
    },
  },
};
</script>
