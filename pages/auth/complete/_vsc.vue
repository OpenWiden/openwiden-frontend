<template>
  <section :class="$style.section">
    <BlockWrapper>
      <div v-if="!user">
        <Preloader width="12" height="12" />
      </div>

      <div v-else>
        <the-text tag="h1">
          Glad to see you,
          <span :class="$style.firstName"> {{ user.firstName }} </span>!
        </the-text>

        <the-button
          :class="$style.homeLink"
          href="/"
          title="Return to main page"
        >
          Return to main page
        </the-button>
      </div>
    </BlockWrapper>
  </section>
</template>

<script>
import BlockWrapper from '@/src/components/BlockWrapper/BlockWrapper';
import TheText from '@/src/components/TheText/TheText';
import TheButton from '@/src/components/TheButton/TheButton';
import Preloader from '@/src/components/Preloader/Preloader';

export default {
  components: { BlockWrapper, TheText, TheButton, Preloader },
  computed: {
    user({ $store }) {
      return $store.state.user;
    },
  },
};
</script>

<style module scoped>
.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
}

.firstName {
  border-bottom: 2px solid var(--dark-theme-primary-accent-bg);
}

.homeLink {
  margin: var(--size-l) auto 0 auto;
}
</style>
