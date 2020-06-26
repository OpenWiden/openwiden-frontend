<template>
  <section :class="styles.repos">
    <div :class="styles.wrapper">
      <the-text :class="styles.title" tag="h2">
        List of projects on GitHub that need your help
      </the-text>

      <repos-filters :on-search="getRepos" />

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
            There are no suitable repositories to show
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
import { Component, Vue } from 'vue-property-decorator';
import styles from './ReposList.css?module';
import TheText from '@/src/components/TheText/TheText.vue';
import RepoCard from '@/src/components/RepoCard/RepoCard.vue';
import ReposFilters from '@/src/components/ReposFilters/ReposFilters.vue';
import RepoCardSkeleton from '@/src/components/RepoCardSkeleton/RepoCardSkeleton.vue';
import { Repository } from '@/src/interfaces/Repository/Repository';
import { Data, DATA_STATUS, DEFAULT_DATA_OBJECT } from '@/src/interfaces/Data';

@Component({
  components: {
    TheText,
    RepoCard,
    RepoCardSkeleton,
    ReposFilters,
  },
})
export default class ReposList extends Vue {
  DATA_STATUS = DATA_STATUS;

  reposCount: number = 0;

  preloaderCards: number = 8;

  repos: Data<Repository> = { ...DEFAULT_DATA_OBJECT };

  async created() {
    await this.getRepos();
  }

  public getRepos() {
    this.repos.loadingStatus = DATA_STATUS.LOADING;

    this.$api
      .getRepositories()
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
  }

  get styles() {
    return styles;
  }
}
</script>
