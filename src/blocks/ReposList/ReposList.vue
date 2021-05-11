<template>
  <section :class="styles.repos">
    <div :class="styles.wrapper">
      <the-text :class="styles.title" tag="h2">
        List of projects that need your help
      </the-text>

      <repos-filters />

      <div :class="styles.reposWrapper">
        <div v-if="repos.loadingStatus === DATA_STATUS.LOADING">
          <ul :class="styles.reposList">
            <li
              v-for="index in preloaderCards"
              :key="index"
              :class="styles.repoItem"
            >
              <repo-card-skeleton />
            </li>
          </ul>
        </div>

        <div v-else-if="repos.loadingStatus === DATA_STATUS.FAILED">
          <the-text :class="styles.title" tag="p">
            An error occurred while loading the repositories
          </the-text>
        </div>

        <div
          v-else-if="repos.loadingStatus === DATA_STATUS.IDLE"
          :class="styles.reposWrapper"
        >
          <the-text :class="styles.title" tag="p">
            There are no repositories to show
          </the-text>
        </div>

        <div v-else-if="repos.loadingStatus === DATA_STATUS.LOADED">
          <ul :class="styles.reposList">
            <li
              v-for="repo in repos.data"
              :key="repo.name"
              :class="styles.repoItem"
            >
              <repo-card :repository="repo" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import styles from './ReposList.css?module';
import TheText from '@/src/components/TheText/TheText.vue';
import RepoCard from '@/src/components/RepoCard/RepoCard.vue';
import ReposFilters from '@/src/components/ReposFilters/ReposFilters.vue';
import RepoCardSkeleton from '@/src/components/RepoCardSkeleton/RepoCardSkeleton.vue';
import { DATA_STATUS, DEFAULT_DATA_OBJECT } from '@/src/interfaces/Data';
import { Filters } from '@/src/interfaces/Filters';
import { Bus } from '@/src/lib/Bus';

export default {
  components: {
    TheText,
    RepoCard,
    RepoCardSkeleton,
    ReposFilters,
  },
  data() {
    return {
      DATA_STATUS,
      reposCount: 0,
      preloaderCards: 8,
      repos: { ...DEFAULT_DATA_OBJECT },
    };
  },
  computed: {
    styles() {
      return styles;
    },
  },
  mounted() {
    Bus.$on('search-repositories', (filtersState: Filters) => {
      this.getRepos(filtersState);
    });
  },
  async created() {
    await this.getRepos();
  },
  methods: {
    getRepos(filtersState?: Filters): void {
      this.repos.loadingStatus = DATA_STATUS.LOADING;

      this.$api
        .getRepositories(filtersState)
        .then(({ results, count }) => {
          if (!results.length) {
            this.repos.loadingStatus = DATA_STATUS.IDLE;
            return;
          }

          this.repos.data = results;
          this.reposCount = count;
          this.repos.loadingStatus = DATA_STATUS.LOADED;
        })
        .catch((err) => {
          this.repos.loadingStatus = DATA_STATUS.FAILED;
          this.repos.errorText = err.message;
        });
    },
  },
};
</script>
