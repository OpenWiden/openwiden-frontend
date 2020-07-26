<template>
  <span v-if="status !== 'initial'" :class="emStatus">
    {{ getStatusText() }}
  </span>
</template>

<script>
import cssmem from 'cssmem';
import styles from './RepoStatus.css?module';

const em = cssmem(styles);

export default {
  props: {
    status: {
      default: 'initial',
      type: String,
    },
  },
  computed: {
    styles() {
      return styles;
    },
    emStatus() {
      return em('status')({ status: this.status });
    },
  },
  methods: {
    getStatusText() {
      switch (this.status) {
        case 'added':
          return 'Added';
        case 'pending':
          return 'Pending';
        case 'Failed':
          return 'Failed';
        default:
          return '';
      }
    },
  },
};
</script>
