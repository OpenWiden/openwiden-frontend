<template>
  <section :class="styles.repos">
    <div :class="styles.wrapper">
      <the-text :class="styles.title" tag="h2">
        List of projects on GitHub that need your help
      </the-text>

      <repos-filters :on-search="getRepos" />

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

      <div v-else-if="repos.length === 0" :class="styles.reposWrapper">
        <the-text :class="styles.title" tag="p">
          There are no suitable repositories to show
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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import styles from './ReposList.css?module';
import TheText from '@/src/components/TheText/TheText.vue';
import RepoCard from '@/src/components/RepoCard/RepoCard.vue';
import ReposFilters from '@/src/components/ReposFilters/ReposFilters.vue';
import RepoCardSkeleton from '@/src/components/RepoCardSkeleton/RepoCardSkeleton.vue';
import { Repository } from '@/src/interfaces/Repository';

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

  async created() {
    await this.getRepos();
  }

  public getRepos() {
    this.$api
      .getRepositories()
      .then(({ results, count }) => {
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
}
</script>
