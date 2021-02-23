<template>
  <div v-if="isVisible" :class="wrapperClass">
    <the-button
      :class="{
        [buttonsClass]: buttonsClass,
        [styles.prevButton]: isPrevBtnAvailable,
      }"
      :on-click="() => onClick(pagination.previous)"
      :disabled="!isPrevBtnAvailable"
      :title="prevBtnTitle"
    >
      <span :class="styles.wrapper">
        Previous
        <arrow-icon
          :class="[styles.icon, styles.prevIcon]"
          width="16"
          height="16"
        />
      </span>
    </the-button>

    <the-button
      :class="{
        [buttonsClass]: buttonsClass,
        [styles.nextButton]: isNextBtnAvailable,
      }"
      :on-click="() => onClick(pagination.next)"
      :disabled="!isNextBtnAvailable"
      :title="nextBtnTitle"
    >
      <span :class="styles.wrapper">
        Next
        <arrow-icon
          :class="[styles.icon, styles.nextIcon]"
          width="16"
          height="16"
        />
      </span>
    </the-button>
  </div>
</template>

<script>
import styles from './Pagination.css?module';
import TheButton from '@/src/components/TheButton/TheButton';
import ArrowIcon from '@/src/components/Icons/ArrowIcon';

export default {
  components: {
    TheButton,
    ArrowIcon,
  },
  props: {
    onClick: {
      type: Function,
      default: () => {},
    },
    buttonsClass: {
      type: String,
      default: () => '',
    },
    wrapperClass: {
      type: String,
      default: () => '',
    },
    pagination: {
      type: Object,
      default: () => ({
        previous: null,
        next: null,
      }),
    },
  },
  computed: {
    styles() {
      return styles;
    },
    isVisible() {
      const { previous, next } = this.pagination;

      return previous !== null || next !== null;
    },
    prevBtnTitle() {
      return this.isPrevBtnAvailable
        ? 'Go to the previous page of list'
        : 'Previous page is not available';
    },
    nextBtnTitle() {
      return this.isNextBtnAvailable
        ? 'Go to the next page of list'
        : 'Next page is not available';
    },
    isPrevBtnAvailable() {
      return Boolean(this.$props.pagination.previous);
    },
    isNextBtnAvailable() {
      return Boolean(this.$props.pagination.next);
    },
  },
};
</script>
