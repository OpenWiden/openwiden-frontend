<template>
  <div :class="styles.filters">
    <the-text tag="h2" visually-hidden>Filters</the-text>

    <ul :class="styles.filtersList">
      <li
        v-for="filter in filters"
        :key="filter.name"
        :class="styles.filterItem"
      >
        <the-select
          v-if="filter.options.length > 0"
          v-bind="filter"
          :value="filtersState[filter.name]"
          :on-change="handleFilterChange"
        />
      </li>

      <li :class="styles.filterItem">
        <the-button
          :class="styles.searchButton"
          type="button"
          title="Search"
          :on-click="handleSearch"
        >
          Search
        </the-button>
      </li>
    </ul>
  </div>
</template>

<script>
import styles from './ReposFilters.css?module';
import TheSelect from '@/src/components/TheSelect/TheSelect';
import TheText from '@/src/components/TheText/TheText';
import TheButton from '@/src/components/TheButton/TheButton';
import { Bus } from '@/src/lib/Bus';

export default {
  emits: ['search-repositories'],
  components: {
    TheSelect,
    TheText,
    TheButton,
  },
  props: {
    onSearch: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      filtersState: {
        PROGRAMMING_LANGUAGE: null,
        STARS_COUNT_GTE: null,
        OPEN_ISSUES_COUNT_GTE: null,
      },
      filters: [
        {
          options: [],
          name: 'PROGRAMMING_LANGUAGE',
          label: 'Language',
          placeholder: 'Choose language...',
        },
        {
          options: [10, 100, 1000, 10000, 1000000],
          name: 'STARS_COUNT_GTE',
          label: 'Popularity (stars)',
          placeholder: 'Greater than...',
        },
        {
          options: [10, 100, 1000, 10000, 1000000],
          name: 'OPEN_ISSUES_COUNT_GTE',
          label: 'Issues',
          placeholder: 'Greater than...',
        },
      ],
    };
  },
  computed: {
    styles() {
      return styles;
    },
  },
  created() {
    this.$api
      .getProgrammingLanguages()
      .then((languages) => {
        const languageFilterIndex = this.filters.findIndex(
          (filter) => filter.name === 'PROGRAMMING_LANGUAGE'
        );

        this.$set(this.filters[languageFilterIndex], 'options', languages);
      })
      .catch((err) => {
        // TODO: Remove this when pl endpoint will exist
        return err;
      });
  },
  methods: {
    onFilterChange(filter, value) {
      this.$store.commit('SET_FILTER', { name: filter, value });
    },
    handleFilterChange(filter, value) {
      this.filtersState[filter] = value;
    },
    handleSearch() {
      Bus.$emit('search-repositories', this.filtersState);
    },
  },
};
</script>
