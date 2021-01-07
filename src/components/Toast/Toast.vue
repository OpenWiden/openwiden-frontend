<template>
  <div :class="styles.toast">
    <success-icon :class="styles.icon" />

    <the-text v-if="message" tag="span" :class="styles.text">
      {{ message }} <br />

      <nuxt-link v-if="href" :class="styles.link" :to="href">
        Link
      </nuxt-link>
    </the-text>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheText from '../TheText/TheText.vue';
import SuccessIcon from '../Icons/SuccessIcon.vue';
import styles from './Toast.css?module';

export interface Props {
  id: number;
  href?: string;
  message?: string;
  state: 'added' | 'removed';
}

export default Vue.extend({
  name: 'Toast',
  components: { SuccessIcon, TheText },

  props: {
    id: {
      type: [String, Number],
      required: false,
      default: 'notification-0',
    },

    message: {
      type: String,
      default: '',
      required: false,
    },

    href: {
      type: String,
      default: null,
      required: false,
    },
  },

  computed: {
    styles() {
      return styles;
    },
  },
});
</script>
