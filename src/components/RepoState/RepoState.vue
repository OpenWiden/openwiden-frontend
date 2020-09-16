<template>
  <span v-if="state !== 'initial'" :class="emState">
    {{ getStateText() }}
  </span>
</template>

<script>
import cssmem from 'cssmem';
import styles from './RepoState.css?module';

const em = cssmem(styles);

export default {
  props: {
    state: {
      default: 'initial',
      type: String,
    },
  },
  computed: {
    styles() {
      return styles;
    },
    emState() {
      return em('state')({ state: this.state });
    },
  },
  methods: {
    getStateText() {
      switch (this.state) {
        case 'added':
          return 'Added';
        case 'adding':
          return 'Adding';
        case 'removing':
          return 'Removing';
        case 'add_failed':
          return 'Failed';
        default:
          return '';
      }
    },
  },
};
</script>
