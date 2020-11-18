<template>
  <transition
    :enter-active-class="styles.enter"
    :leave-active-class="styles.leave"
  >
    <div
      v-if="show"
      :class="styles.toast"
      :style="{ top: topCoordinate + 'px' }"
    >
      <success-icon :class="styles.icon" width="16" height="16" />

      <the-text tag="span" :class="styles.text">
        {{ message }} <br />
        <a :class="styles.link">Link</a>
      </the-text>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import TheText from '../TheText/TheText.vue';
import SuccessIcon from '../Icons/SuccessIcon.vue';
import styles from './Toast.css?module';

const START_TOP_COORDINATE = 25;
const GAP = 20;

export default Vue.extend({
  name: 'Toast',
  components: { SuccessIcon, TheText },

  props: {
    href: {
      type: String,
      required: false,
    },

    message: {
      type: String,
      required: true,
    },

    count: {
      type: Number,
      required: false,
      default: 0,
    },

    ms: {
      type: Number,
      required: false,
      default: 3000,
    },
  },

  data() {
    return {
      show: false,
    };
  },

  computed: {
    toastsHeight(): number {
      const toasts = document.getElementById('notifications')?.children || [];
      let toastsHeight = 0;

      for (let i = 0; i < toasts.length; i++) {
        toastsHeight += toasts[i].clientHeight;
      }

      return toastsHeight;
    },

    topCoordinate(): number {
      if (this.count === 0) {
        return START_TOP_COORDINATE;
      }

      return START_TOP_COORDINATE + this.count * GAP + this.toastsHeight;
    },

    styles() {
      return styles;
    },
  },

  mounted() {
    this.show = true;

    setTimeout(() => {
      this.show = false;
    }, this.$props.ms);
  },
});
</script>
