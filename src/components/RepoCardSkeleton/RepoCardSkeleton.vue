<template>
  <article :class="styles.repoCardSkeleton">
    <preloader />
  </article>
</template>

<script>
import styles from './RepoCardSkeleton.css?module';
import Preloader from '@/src/components/Preloader/Preloader';

export default {
  components: {
    Preloader,
  },
  computed: {
    styles() {
      return styles;
    },
  },
};
</script>
