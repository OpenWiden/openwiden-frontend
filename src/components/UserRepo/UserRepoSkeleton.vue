<template>
  <div :class="[styles.repo]">
    <div :class="styles.repoBlock">
      <skeleton
        :class="styles.repoVCS"
        :style="{ width: '28px', height: '28px' }"
        is-circle
      />

      <div :class="styles.repoName">
        <skeleton :style="{ width: '8em' }" is-line />
      </div>
    </div>

    <div :class="styles.repoBlock">
      <skeleton :style="{ width: '8em' }" is-line />
    </div>

    <div :class="styles.repoBlock">
      <skeleton :style="{ width: '6em' }" is-line />
    </div>
  </div>
</template>

<script>
import styles from './UserRepo.css?module';
import Skeleton from '@/src/components/Skeleton/Skeleton';

export default {
  components: {
    Skeleton,
  },

  computed: {
    styles() {
      return styles;
    },
  },
};
</script>
