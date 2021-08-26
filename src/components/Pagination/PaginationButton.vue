<template>
  <the-button
    :disabled="isActive"
    :class="[styles.paginationButton, buttonClass, isActive && styles.active]"
    :title="`Go to page №${pageNumber}`"
    :on-click="() => onClick(pageNumber)"
  >
    {{ pageNumber }}
  </the-button>
</template>

<script>
import styles from './Pagination.css?module';
import TheButton from '@/src/components/TheButton/TheButton';

export default {
  components: {
    TheButton,
  },
  props: {
    pageNumber: {
      type: Number,
      default: () => 0,
    },
    buttonClass: {
      type: String,
      default: () => '',
    },
    currentPage: {
      type: [Number, String],
      default: () => 0,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    styles() {
      return styles;
    },
    isActive() {
      const { currentPage, pageNumber } = this.$props;

      return Number(currentPage) === Number(pageNumber);
    },
  },
};
</script>
