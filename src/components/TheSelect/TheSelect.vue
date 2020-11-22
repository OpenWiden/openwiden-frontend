<template>
  <div class="wrapper">
    <label class="label">
      <span class="labelText">{{ label }}</span>
      <v-select
        :options="options"
        :placeholder="placeholder"
        :label="optionLabel"
        :clearable="true"
        :value="value"
        @input="(value) => onChange(filter, value)"
      >
        <template #open-indicator="{ attributes }">
          <button v-bind="attributes">
            <arrow-icon aria-hidden />
          </button>
        </template>
      </v-select>
    </label>
  </div>
</template>

<script scoped>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import ArrowIcon from '@/src/components/Icons/ArrowIcon';

export default {
  components: {
    vSelect,
    ArrowIcon,
  },
  props: {
    options: {
      type: [Array, Object],
      default: () => [],
    },
    filter: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: () => '',
    },
    value: {
      type: [String, Number, Object],
      default: () => '',
    },
    placeholder: {
      type: String,
      default: () => '',
    },
    optionLabel: {
      type: String,
      default: () => '',
    },
    onChange: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style scoped>
.wrapper >>> .v-select {
  background-color: var(--primary-bg-select);
  border-radius: var(--primary-border-radius-select);
  font-size: 14px;
}

.wrapper >>> .v-select .vs__dropdown-toggle {
  padding: 0;
  border: none;
}

.wrapper >>> .v-select .vs__selected-options {
  margin-top: auto;
  padding: 5px 10px;
}

.wrapper >>> .v-select .vs__selected {
  margin: 0;
  padding: 0;
  border: none;
  color: var(--primary-typo-select);
}

.wrapper >>> .v-select .vs__search {
  margin: 0;
  padding: 0;
  border: var(--primary-border-select);
  font-family: var(--primary-font);
  color: var(--primary-typo-select);
}

.wrapper >>> .v-select .vs__search::placeholder {
  color: var(--primary-typo-select-placeholder);
}

.wrapper >>> .v-select .vs__search::-ms-input-placeholder {
  color: var(--primary-typo-select-placeholder);
}

.wrapper >>> .v-select .vs__actions {
  background-color: var(--secondary-bg-select);
  border-radius: 0 6px 6px 0;
  padding: 16px 12px;
}

.wrapper >>> .v-select .vs__dropdown-menu {
  top: calc(100% + 3px);
  background-color: var(--primary-bg-select);
  border-radius: var(--primary-border-radius-select);
  border: var(--primary-border-select);
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
}

.wrapper >>> .v-select .vs__dropdown-option {
  color: var(--primary-typo-select);
}

.wrapper >>> .v-select .vs__dropdown-option--highlight {
  background-color: var(--secondary-bg-select);
}

.vs__open-indicator {
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
}

.wrapper >>> .v-select .vs__open-indicator,
.wrapper >>> .v-select .vs__clear {
  width: 16px;
  height: 16px;
}

.wrapper >>> .v-select .vs__clear {
  display: flex;
  justify-content: center;
}

.wrapper >>> .v-select .vs__open-indicator svg,
.wrapper >>> .v-select .vs__clear svg {
  fill: rgba(255, 255, 255, 0.87);
}

.label {
  position: relative;
  display: block;
}

.labelText {
  position: absolute;
  z-index: 2;
  top: 4px;
  left: 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}
</style>
