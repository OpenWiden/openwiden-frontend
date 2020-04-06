<template>
  <div :class="styles.filters">
    <ul :class="styles.filtersList">
      <li :class="styles.filterItem">
        <the-select
          :options="languages"
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
    return { languages: ['Python', 'Go', 'JavaScript'] };
  },
  computed: {
    styles() {
      return styles;
    },
  },
};
</script>
