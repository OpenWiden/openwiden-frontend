<template>
  <section :class="styles.addRepo">
    <BlockWrapper size="tablet" :class="styles.wrapper">
      <the-text tag="h1" size="h2" :with-underlay="true">
        My repositories
      </the-text>

      <the-text tag="p" :class="styles.subtitle">
        You can add your repositories to OpenWiden from any connected version
        control system. <br />
        Also, you are able to have more than one active connection with vsc at
        the same time.
      </the-text>

      <UserRepos
        :loading-status="repos.loadingStatus === DATA_STATUS.LOADING"
        :repos="repos.data"
      />
    </BlockWrapper>
  </section>
</template>

<script>
import styles from './index.css?module';
import TheText from '@/src/components/TheText/TheText';
import BlockWrapper from '@/src/components/BlockWrapper/BlockWrapper';
import UserRepos from '@/src/components/UserRepos/UserRepos';
import { DATA_STATUS, DEFAULT_DATA_OBJECT } from '@/src/interfaces/Data';

export default {
  components: {
    TheText,
    BlockWrapper,
    UserRepos,
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
    changeRepoStatus(id, nextStatus) {
      const { data } = this.repos;

      data.find((item, index) => {
        if (item.id === id) {
          this.$set(data, index, { ...item, status: nextStatus });
        }
      });
    },

    onClick(status) {
      return status === 'added' ? this.removeRepository : this.addRepository;
    },

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

          repos.data = results.sort((a) => (a.status === 'added' ? -1 : 1));
          repos.loadingStatus = DATA_STATUS.LOADED;
        })
        .catch((err) => {
          repos.loadingStatus = DATA_STATUS.FAILED;
          repos.errorText = err.message;
        });
    },
  },
};
</script>