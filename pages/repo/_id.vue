<template>
  <section :class="styles.wrapper">
    <div v-if="repository.loadingStatus === DATA_STATUS.LOADING">
      <header :class="styles.header">
        <div :class="styles.texts">
          <the-text :class="styles.title" tag="h1">
            <skeleton :class="styles.title" is-line />
          </the-text>

          <div :style="{ margin: '10px 0' }" :class="styles.stats">
            <skeleton :style="{ height: '24px' }" is-line />
          </div>

          <skeleton
            v-for="index in 3"
            :key="index"
            :class="styles.description"
            :style="{ width: `${24 - index * 4}em` }"
            is-line
          />
        </div>

        <div>
          <skeleton :style="{ width: '34px', height: '34px' }" is-circle />
        </div>
      </header>
    </div>

    <div v-else-if="repository.loadingStatus === DATA_STATUS.LOADED">
      <header :class="styles.header">
        <div :class="styles.texts">
          <the-text :class="styles.title" tag="h1">
            {{ repository.data.name }}
          </the-text>

          <div :class="styles.stats">
            <repo-stats v-bind="repository.data" />
          </div>

          <the-text :class="styles.description" tag="p">
            {{ repository.data.description }}
          </the-text>
        </div>

        <div>
          <repo-lang
            :programming-language="repository.data.programmingLanguage"
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

      <div>
        <ul
          v-if="issues.loadingStatus === DATA_STATUS.LOADING"
          :class="[styles.issuesList]"
        >
          <li
            v-for="index in 10"
            :key="index"
            :class="[styles.issue, styles.loadingIssue]"
          >
            <div :class="styles.issueLink">
              <icon-issue :class="styles.issueIcon" width="16" height="16" />

              <div :class="styles.issueDescription">
                <skeleton :style="{ width: '14em' }" is-line />

                <skeleton :class="styles.info" is-line />
              </div>
            </div>
          </li>
        </ul>

        <div v-if="issues.loadingStatus === DATA_STATUS.LOADED">
          <ul :class="styles.issuesList">
            <li
              v-for="issue in issues.data"
              :key="issue.id"
              :class="styles.issue"
            >
              <a
                :class="styles.issueLink"
                :href="issue.url"
                target="_blank"
                title="Open the issue"
              >
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
              :disabled="!Boolean(pagination.next)"
              :on-click="() => getRepoIssues(pagination.next)"
              title="Next"
            >
              Next
            </the-button>
          </div>
        </div>

        <div v-if="issues.loadingStatus === DATA_STATUS.IDLE">
          <the-text tag="p">
            This repository doesn't have issues. Lucky!
          </the-text>
        </div>

        <div v-if="issues.loadingStatus === DATA_STATUS.FAILED">
          <the-text tag="p">
            Error occured while we tried to fetch issues. Please try again later
          </the-text>
        </div>
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
import Skeleton from '@/src/components/Skeleton/Skeleton';
import RepoLang from '@/src/components/RepoLang/RepoLang';
import { DATA_STATUS, DEFAULT_DATA_OBJECT } from '@/src/interfaces/Data';

const DAY = 24 * 3600 * 1000;

export default {
  components: {
    TheText,
    RepoStats,
    RepoLang,
    IconIssue,
    TheButton,
    Skeleton,
  },
  data() {
    return {
      DATA_STATUS,
      DEFAULT_DATA_OBJECT,
      repository: { ...DEFAULT_DATA_OBJECT },
      issues: { ...DEFAULT_DATA_OBJECT },
      pagination: {
        previous: null,
        next: null,
      },
      repoID: this.$route.params.id,
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
    getRepo() {
      this.repository.loadingStatus = DATA_STATUS.LOADING;

      this.$api
        .getRepository(this.repoID)
        .then((repo) => {
          this.repository.data = repo;
          this.repository.loadingStatus = DATA_STATUS.LOADED;
        })
        .catch((err) => {
          this.repository.errorText = err.message;
          this.repository.loadingStatus = DATA_STATUS.FAILED;
        });
    },
    getDateDifference(date) {
      return parseInt((new Date().getTime() - new Date(date).getTime()) / DAY);
    },
    getRepoIssues(url) {
      this.issues.loadingStatus = DATA_STATUS.LOADING;

      this.$api
        .getRepositoryIssues(this.repoID, url)
        .then(({ results, next, previous }) => {
          if (results.length) {
            this.issues.data = results;
            this.issues.loadingStatus = DATA_STATUS.LOADED;
          } else {
            this.issues.data = null;
            this.issues.loadingStatus = DATA_STATUS.IDLE;
          }

          this.pagination.next = next;
          this.pagination.previous = previous;
        })
        .catch((err) => {
          this.issues.errorText = err.message;
          this.issues.loadingStatus = DATA_STATUS.FAILED;
        });
    },
  },
};
</script>
