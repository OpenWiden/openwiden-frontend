<template>
  <section :class="styles.repos">
    <div :class="styles.wrapper">
      <the-text :class="styles.title" tag="h2">
        List of projects on GitHub that need your help
      </the-text>

      <repos-filters />

      <div v-if="areReposLoading" :class="styles.reposWrapper">
        <ul :class="styles.reposList">
          <li v-for="item in new Array(8)" :key="item" :class="styles.repoItem">
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
          <li v-for="repo in items" :key="repo.name" :class="styles.repoItem">
            <repo-card :repository="repo" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import styles from './ReposList.css?module';
import TheText from '@/src/components/TheText/TheText.vue';
import RepoCard from '@/src/components/RepoCard/RepoCard.vue';
import ReposFilters from '@/src/components/ReposFilters/ReposFilters.vue';
import RepoCardSkeleton from '@/src/components/RepoCardSkeleton/RepoCardSkeleton.vue';
import { Filter, Filters } from '@/src/interfaces/Filters';
import { getObjectKeys } from '@/src/lib/getObjectKeys';
import { Repository } from '@/src/interfaces/Repository';

const filtrators: {
  [k: string]: (repos: Repository[], filterValue: any) => Repository[];
} = {
  [Filter.STAR_COUNT]: (repos, filterValue) => {
    if (!filterValue) return repos;
    return repos;
  },
  [Filter.OPEN_ISSUES_COUNT]: (repos, filterValue) => {
    if (!filterValue) return repos;
    return repos;
  },
  [Filter.FORKS_COUNT]: (repos, filterValue) => {
    if (!filterValue) return repos;
    return repos;
  },
  [Filter.VERSION_CONTROL_SERVICE]: (repos, filterValue) => {
    if (!filterValue) return repos;
    return repos;
  },
  [Filter.CREATED_AT]: (repos, filterValue) => {
    if (!filterValue) return repos;
    return repos;
  },
  [Filter.UPDATED_AT]: (repos, filterValue) => {
    if (!filterValue) return repos;
    return repos;
  },
  [Filter.PROGRAMMING_LANGUAGE]: (repos, filterValue) => {
    if (!filterValue) return repos;

    return repos.filter(
      (repo) => repo.programming_language.name === filterValue.name
    );
  },
};

@Component({
  components: {
    TheText,
    RepoCard,
    RepoCardSkeleton,
    ReposFilters,
  },
})
export default class ReposList extends Vue {
  areReposLoading: boolean = true;
  reposCount: number = 0;
  repos: Repository[] | null = null;
  error: boolean = false;

  created() {
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
  }

  get styles() {
    return styles;
  }

  get items() {
    const { filters }: { filters: Filters } = this.$store.state;
    const filtersKeys = getObjectKeys(filters);

    if (!this.repos) return null;

    return filtersKeys.reduce((filteredRepos: Repository[], filter: Filter) => {
      return filtrators[filter](filteredRepos, filters[filter]);
    }, this.repos);
  }
}
</script>
