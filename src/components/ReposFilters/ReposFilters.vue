<template>
  <div :class="styles.filters">
    <the-text tag="h2" visually-hidden>Filters</the-text>

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
    </ul>
  </div>
</template>

<script>
import styles from './ReposFilters.css?module';
import TheSelect from '@/src/components/TheSelect/TheSelect';
import TheText from '@/src/components/TheText/TheText';

export default {
  components: {
    TheSelect,
    TheText,
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
