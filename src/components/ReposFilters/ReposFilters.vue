<template>
  <div :class="styles.filters">
    <ul :class="styles.filtersList">
      <li :class="styles.filterItem">
        <the-select
          v-if="languages.length > 0"
          :options="languages"
          :on-change="onChange"
          :value="$store.state.filters.programmingLanguage"
          option-label="name"
          label="Language"
          placeholder="Choose language..."
        />
      </li>
      <li :class="styles.filterItem">
        <the-button
          :class="styles.searchButton"
          title="Search repositories"
          type="button"
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
import TheButton from '@/src/components/TheButton/TheButton';

export default {
  components: {
    TheSelect,
    TheButton,
  },
  data() {
    return { languages: [] };
  },
  computed: {
    styles() {
      return styles;
    },
  },
  async beforeMount() {
    const { results } = await this.$axios.$get(
      '/api/v1/programming_languages/'
    );
    this.languages.push(...results);
  },
  methods: {
    onChange(value) {
      this.$store.commit('SET_FILTER', { name: 'PROGRAMMING_LANGUAGE', value });
    },
  },
};
</script>
