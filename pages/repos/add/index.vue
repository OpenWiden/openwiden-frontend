<template>
  <section :class="$style.addRepo">
    <BlockWrapper size="tablet">
      <the-text tag="h1" size="h2">
        Add a new repository to OpenWiden
      </the-text>

      <the-text tag="p">
        You can add your repositories to OpenWiden from any connected version
        control system. You are able to have more than one active connections
        with vsc at the same time
      </the-text>

      <div :class="$style.addRepoBlock">
        <the-text tag="h2" size="h3">
          GitLab
        </the-text>

        <div v-if="repos.loadingStatus === DATA_STATUS.LOADING">Loading</div>

        <table v-else :class="$style.addRepoTable">
          <tr
            v-for="repo in repos.data"
            :key="repo.name"
            :class="$style.tableRow"
          >
            <td :class="[$style.tableCell, $style.repoName]">
              {{ repo.name }}
            </td>

            <td :class="$style.tableCell">
              <repo-stats v-bind="repo" />
            </td>

            <td :class="$style.tableCell">
              <span v-if="repo.isAdded" :class="[$style.status, $style.added]">
                Added
              </span>
              <span
                v-if="repo.isLoading"
                :class="[$style.status, $style.pending]"
              >
                Pending
              </span>
            </td>

            <td :class="$style.tableCell">
              <the-button
                :class="$style.button"
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
          this.repos.data.find((item, index) => {
            if (item.id === id) {
              this.$set(this.repos.data, index, { ...item, isLoading: true });
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

<style scoped module>
.addRepo {
  margin-top: 70px;
}

.addRepoBlock {
  margin-top: var(--size-m);
}

.addRepoTable {
  margin-top: var(--size-s);
}

.tableCell {
  padding: 0;
  padding-top: 10px;
  padding-bottom: calc(var(--size-xxs) * 2);

  &:first-of-type {
    padding-left: calc(var(--size-s) * 2);
  }

  &:last-of-type {
    padding-right: calc(var(--size-s) * 2);
  }
}

.tableRow {
  border-bottom: 1px solid #c4c4c4;

  &:first-of-type .tableCell {
    padding-top: 0;
  }
}

.button {
  width: 100%;
  min-height: 36px;
  max-width: 100px;
  margin-left: auto;
  font-size: 14px;
  text-transform: uppercase;
}

.status {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: calc(var(--size-xxs) * 2) var(--size-s);
  border-radius: 4px;

  &.added {
    background-color: #53b124;
  }

  &.pending {
    background-color: #fec400;
  }

  &.error {
    background-color: #e25443;
  }
}

.repoName {
  text-transform: capitalize;
}

@media (min-width: 768px) {
  .wrapper {
    padding: var(--size-l);
  }

  .addRepoBlock {
    margin-top: var(--size-l);
  }
}
</style>
