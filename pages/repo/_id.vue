<template>
  <section :class="styles.wrapper">
    <div v-if="repository">
      <header :class="styles.header">
        <div :class="styles.texts">
          <the-text :class="styles.title" tag="h1">
            {{ repository.name }}
          </the-text>

          <div :class="styles.stats">
            <repo-stats v-bind="repository" />
          </div>

          <the-text :class="styles.description" tag="p">
            {{ repository.description }}
          </the-text>
        </div>

        <div>
          <repo-lang
            :programming-language="repository.programmingLanguage"
            width="34"
            height="34"
          />
        </div>
      </header>
    </div>

    <div :class="styles.issuesBlock">
      <the-text :class="styles.issuesTitle" tag="h2">
        Issues
      </the-text>

      <ul v-if="issues" :class="styles.issuesList">
        <li v-for="issue in issues" :key="issue.id" :class="styles.issue">
          <a :class="styles.issueLink" :href="issue.url" title="Open the issue">
            <icon-issue :class="styles.issueIcon" width="16" height="16" />

            <div :class="styles.issueDescription">
              <the-text tag="p">
                {{ issue.title }}
              </the-text>

              <the-text :class="styles.info" tag="p">
                Opened {{ getDateDifference(issue.createdAt) }} days ago •
                updated {{ getDateDifference(issue.updatedAt) }} day ago
              </the-text>
            </div>
          </a>
        </li>
      </ul>

      <div :class="styles.pagination">
        <the-button
          :on-click="() => getRepoIssues(pagination.previous)"
          :class="styles.paginationButton"
          :disabled="!Boolean(pagination.previous)"
          title="Previous"
        >
          Previous
        </the-button>
        <the-button
          :class="styles.paginationButton"
          title="Next"
          :disabled="!Boolean(pagination.next)"
          :on-click="() => getRepoIssues(pagination.next)"
        >
          Next
        </the-button>
      </div>
    </div>
  </section>
</template>

<script>
import styles from './repo.css?module';
import TheText from '@/src/components/TheText/TheText';
import TheButton from '@/src/components/TheButton/TheButton';
import RepoStats from '@/src/components/RepoStats/RepoStats';
import IconIssue from '@/src/components/Icons/IconIssue';
import RepoLang from '@/src/components/RepoLang/RepoLang';

const DAY = 24 * 3600 * 1000;

export default {
  components: {
    TheText,
    RepoStats,
    RepoLang,
    IconIssue,
    TheButton,
  },
  data() {
    return {
      repository: null,
      issues: null,
      pagination: {
        previous: null,
        next: null,
      },
      repoID: this.$route.params.id,
      activeItem: null,
    };
  },
  computed: {
    styles() {
      return styles;
    },
  },
  created() {
    this.getRepo();
    this.getRepoIssues();
  },

  methods: {
    async getRepo() {
      const repo = await this.$api.getRepository(this.repoID);
      this.repository = repo;
    },
    getDateDifference(date) {
      return parseInt((new Date().getTime() - new Date(date).getTime()) / DAY);
    },
    async getRepoIssues(url) {
      const { results, next, previous } = await this.$api.getRepositoryIssues(
        this.repoID,
        url
      );
      this.issues = results;
      this.pagination.next = next;
      this.pagination.previous = previous;
    },
  },
};
</script>
