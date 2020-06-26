<template>
  <section :class="styles.addRepo">
    <BlockWrapper size="tablet">
      <the-text tag="h1" size="h2">
        Add a new repository to OpenWiden
      </the-text>

      <the-text tag="p">
        You can add your repositories to OpenWiden from any connected version
        control system. You are able to have more than one active connections
        with vsc at the same time
      </the-text>

      <div :class="styles.addRepoBlock">
        <the-text tag="h2" size="h3">
          GitLab
        </the-text>

        <div v-if="repos.loadingStatus === DATA_STATUS.LOADING">Loading</div>

        <table v-else :class="styles.addRepoTable">
          <tr
            v-for="repo in repos.data"
            :key="repo.name"
            :class="styles.tableRow"
          >
            <td :class="[styles.tableCell, styles.repoName]">
              {{ repo.name }}
            </td>

            <td :class="styles.tableCell">
              <repo-stats v-bind="repo" />
            </td>

            <td :class="styles.tableCell">
              <span v-if="repo.isAdded" :class="[styles.status, styles.added]">
                Added
              </span>
              <span
                v-if="repo.isLoading"
                :class="[styles.status, styles.pending]"
              >
                Pending
              </span>
            </td>

            <td :class="styles.tableCell">
              <the-button
                :class="styles.button"
                :is-transparent="repo.isAdded"
                :is-loading="repo.isLoading"
                :disabled="repo.isLoading"
                :on-click="repo.isAdded ? null : () => addRepository(repo.id)"
                :title="
                  repo.isAdded
                    ? 'Remove repostiroty from our service'
                    : 'Add repostiroty to our service'
                "
              >
                {{ repo.isAdded ? 'Remove' : 'Add' }}
              </the-button>
            </td>
          </tr>
        </table>
      </div>
    </BlockWrapper>
  </section>
</template>

<script>
import styles from './index.css?module';
import TheText from '@/src/components/TheText/TheText';
import BlockWrapper from '@/src/components/BlockWrapper/BlockWrapper';
import RepoStats from '@/src/components/RepoStats/RepoStats';
import TheButton from '@/src/components/TheButton/TheButton';
import { DATA_STATUS, DEFAULT_DATA_OBJECT } from '@/src/interfaces/Data';

export default {
  components: {
    TheText,
    BlockWrapper,
    RepoStats,
    TheButton,
  },
  data() {
    return {
      DATA_STATUS,
      repos: DEFAULT_DATA_OBJECT,
      repoErr: null,
    };
  },
  computed: {
    styles() {
      return styles;
    },
  },
  created() {
    this.getRepos();
  },
  methods: {
    getRepos() {
      const { repos, $api } = this;

      repos.loadingStatus = DATA_STATUS.LOADING;

      $api
        .getUserRepositories()
        .then(({ results }) => {
          if (!results.length) {
            repos.loadingStatus = DATA_STATUS.IDLE;
            return;
          }

          repos.data = results.sort((a) => (a.isAdded ? -1 : 1));
          repos.loadingStatus = DATA_STATUS.LOADED;
        })
        .catch((err) => {
          repos.loadingStatus = DATA_STATUS.FAILED;
          repos.errorText = err.message;
        });
    },
    addRepository(id) {
      this.$api
        .addUserRepository(id)
        .then(() => {
          const { data } = this.repos;

          data.find((item, index) => {
            if (item.id !== id) {
              this.$set(data, index, { ...item, isLoading: true });
            }
          });
        })
        .catch((err) => {
          this.repoErr = {
            id,
            errorText: err.message,
          };
        });
    },
  },
};
</script>
