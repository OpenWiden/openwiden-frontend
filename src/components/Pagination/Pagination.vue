<template>
  <div :class="wrapperClass">
    <the-button
      :class="{
        buttonsClass,
        [styles.prevButton]: isPrevBtnAvailable,
      }"
      :on-click="onPrevClick"
      :disabled="!isPrevBtnAvailable"
      title="Go to the previous page of list"
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
        buttonsClass,
        [styles.nextButton]: isNextBtnAvailable,
      }"
      :on-click="onNextClick"
      :disabled="!isNextBtnAvailable"
      title="Go to the next page of list"
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
    onPrevClick: {
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
    onNextClick: {
      type: Function,
      default: () => {},
    },
    pagination: {
      type: Object,
      default: () => ({
        prev: null,
        next: null,
      }),
    },
  },
  computed: {
    styles() {
      return styles;
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
