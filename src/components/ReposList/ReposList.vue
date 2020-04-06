<template>
  <section :class="styles.repos">
    <div :class="styles.wrapper">
      <the-text :class="styles.title" tag="h2">
        List of projects on GitHub that need your help
      </the-text>

      <repos-filters />

      <div v-if="areReposLoading" :class="styles.reposWrapper">
        <ul :class="styles.reposList">
          <li :class="styles.repoItem">
            <repo-card-skeleton />
          </li>
          <li :class="styles.repoItem">
            <repo-card-skeleton />
          </li>
          <li :class="styles.repoItem">
            <repo-card-skeleton />
          </li>
          <li :class="styles.repoItem">
            <repo-card-skeleton />
          </li>
          <li :class="styles.repoItem">
            <repo-card-skeleton />
          </li>
          <li :class="styles.repoItem">
            <repo-card-skeleton />
          </li>
        </ul>
      </div>

      <div v-else-if="!areReposLoading && error" :class="styles.reposWrapper">
        <the-text :class="styles.title" tag="p">
          An error occurred while loading the repositories
        </the-text>
      </div>

      <div v-else :class="styles.reposWrapper">
        <ul :class="styles.reposList">
          <li v-for="repo in repos" :key="repo.name" :class="styles.repoItem">
            <repo-card :repository="repo" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import styles from './ReposList.css?module';
import TheText from '@/src/components/TheText/TheText';
import RepoCard from '@/src/components/RepoCard/RepoCard';
import ReposFilters from '@/src/components/ReposFilters/ReposFilters';
import RepoCardSkeleton from '@/src/components/RepoCardSkeleton/RepoCardSkeleton';

export default {
  components: {
    TheText,
    RepoCard,
    RepoCardSkeleton,
    ReposFilters,
  },
  data() {
    return {
      areReposLoading: true,
      reposCount: 0,
      repos: null,
      error: false,
    };
  },
  computed: {
    styles() {
      return styles;
    },
  },
  beforeMount() {
    this.$axios
      .$get('/api/v1/repositories/')
      .then(({ count, results }) => {
        this.repos = results;
        this.reposCount = count;
        this.areReposLoading = false;
      })
      .catch((err) => {
        this.error = err;
        this.areReposLoading = false;
      });
  },
};
</script>
