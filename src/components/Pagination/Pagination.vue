<template>
  <div v-if="isPaginationVisible" :class="[styles.wrapper, wrapperClass]">
    <the-button
      v-if="isBigPagesCollection"
      :class="[styles.paginationButton, styles.paginationControl]"
      :disabled="isPrevDisabled"
      title="Go to previous page"
      :on-click="handlePrevClick"
    >
      <arrow-icon :class="[styles.icon, styles.left]" />
    </the-button>

    <div :class="styles.buttons">
      <pagination-button
        v-for="pageNumber in pages"
        :key="pageNumber"
        :page-number="pageNumber"
        :current-page="current"
        :button-class="buttonsClass"
        :on-click="handleClick"
      />
    </div>

    <the-button
      v-if="isBigPagesCollection"
      :class="[styles.paginationButton, styles.paginationControl]"
      :disabled="isNextDisabled"
      title="Go to next page"
      :on-click="handleNextClick"
    >
      <arrow-icon :class="[styles.icon, styles.right]" />
    </the-button>
  </div>
</template>

<script>
import styles from './Pagination.css?module';
import TheButton from '@/src/components/TheButton/TheButton';
import ArrowIcon from '@/src/components/Icons/ArrowIcon';
import PaginationButton from '@/src/components/Pagination/PaginationButton';

export const PAGINATION_DEFAULT_STATE = {
  current: 1,
  total: 0,
  perPage: 0,
};

export default {
  components: {
    TheButton,
    PaginationButton,
    ArrowIcon,
  },
  props: {
    buttonsClass: {
      type: String,
      default: () => '',
    },
    wrapperClass: {
      type: String,
      default: () => '',
    },
    current: {
      type: [Number],
      default: () => 0,
    },
    total: {
      type: Number,
      default: () => 0,
    },
    perPage: {
      type: Number,
      default: () => 0,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      step: 0,
      disabledNext: false,
      disabledPrev: false,
    };
  },
  computed: {
    styles() {
      return styles;
    },
    isPaginationVisible() {
      return this.$props.total > 1;
    },
    pagesCount() {
      const { perPage, total } = this.$props;

      if (!total || !perPage) return 0;

      return Math.ceil(total / perPage);
    },
    isBigPagesCollection() {
      return this.pagesCount >= 10;
    },
    pages() {
      const { perPage } = this.$props;
      const pagesCollection = [];

      for (let i = 1; i <= this.pagesCount; i++) {
        pagesCollection.push(i);
      }

      if (this.isBigPagesCollection) {
        const startIdx = this.$data.step * perPage;
        const endIdx = startIdx + perPage;

        return pagesCollection.slice(startIdx, endIdx);
      }

      return pagesCollection;
    },

    isPrevDisabled() {
      return this.$data.step === 0;
    },

    isNextDisabled() {
      return (this.$data.step + 1) * this.$props.perPage >= this.pagesCount;
    },
  },
  methods: {
    handleClick(idx) {
      this.$props.onClick(idx);

      history.pushState({}, null, this.$route.path + `?page=${idx}`);
    },
    handleNextClick() {
      if (!this.isNextDisabled) {
        this.$data.step += 1;
      }
    },
    handlePrevClick() {
      if (!this.isPrevDisabled) {
        this.$data.step -= 1;
      }
    },
  },
};
</script>
