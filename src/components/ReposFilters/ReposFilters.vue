<template>
  <div :class="styles.filters">
    <the-text tag="h2" visually-hidden>Filters</the-text>

    <ul :class="styles.filtersList">
      <li v-if="languages.length > 0" :class="styles.filterItem">
        <the-select
          filter="PROGRAMMING_LANGUAGE"
          option-label="name"
          label="Language"
          placeholder="Choose language..."
          :options="languages"
          :on-change="onFilterChange"
          :value="$store.state.filters.PROGRAMMING_LANGUAGE"
        />
      </li>
      <li
        v-for="filter in filters"
        :key="filter.name"
        :class="styles.filterItem"
      >
        <the-select
          v-if="filter.options.length > 0"
          v-bind="filter"
          :filter="filter.name"
          :value="$store.state.filters[filter.name]"
        />
      </li>
      <li :class="styles.filterItem">
        <the-button
          :class="styles.searchButton"
          type="button"
          title="Search"
          :on-click="onSearch"
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

export default {
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
      languages: [],
      filters: [
        {
          options: [10, 100, 1000, 10000, 1000000],
          name: 'STARS_COUNT_GTE',
          label: 'Popularity (stars)',
          placeholder: 'Greater than...',
          onChange: this.onFilterChange,
        },
        {
          options: [10, 100, 1000, 10000, 1000000],
          name: 'OPEN_ISSUES_COUNT_GTE',
          label: 'Issues',
          placeholder: 'Greater than...',
          onChange: this.onFilterChange,
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
      .then(() => {
        // this.languages = results;
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
  },
};
</script>
