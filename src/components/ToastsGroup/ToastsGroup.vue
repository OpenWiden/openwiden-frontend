<template>
  <div :class="styles.container">
    <transition-group tag="ul" name="toast-fade">
      <li v-for="item in active" :key="item.id" :data-id="item.id">
        <div :class="styles.toast">
          <success-icon :class="styles.icon" />

          <the-text tag="span" :class="styles.text">
            {{ item.message }} <br />
            <a :class="styles.link">Link</a>
          </the-text>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheText from '../TheText/TheText.vue';
import SuccessIcon from '../Icons/SuccessIcon.vue';
import styles from './ToastsGroup.css?module';
import { events } from './events';

interface Toast {
  id: number;
  href?: string;
  message?: string;
  count?: number;
  ms?: number;
  state: 'IDLE' | 'DELETED';
}

export default Vue.extend({
  name: 'ToastsGroup',
  components: { SuccessIcon, TheText },

  props: {
    href: {
      type: String,
      default: null,
      required: false,
    },

    message: {
      type: String,
      default: '',
      required: false,
    },

    ms: {
      type: Number,
      required: false,
      default: 3000,
    },

    id: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  data(): { show: boolean; list: Toast[] } {
    return {
      show: false,
      list: [],
    };
  },

  computed: {
    active() {
      return this.$data.list
        .filter(({ state }: Toast) => state !== 'DELETED')
        .reverse();
    },

    styles() {
      return styles;
    },
  },

  mounted() {
    events.$on('add', this.addItem);
  },

  methods: {
    addItem(item: Toast): void {
      if (!item) return;

      this.list.push(item);

      setTimeout(() => {
        this.removeItem(item.id);
      }, this.$props.ms);
    },

    removeItem(targetId: number) {
      this.list.find((item, index) => {
        if (item.id === targetId) {
          this.$set(this.list, index, { ...item, state: 'DELETED' });
        }
      });
    },
  },
});
</script>

<style>
.toast-fade-enter-active,
.toast-fade-leave-active,
.toast-fade-move {
  transition: all 0.6s;
}

.toast-fade-enter,
.toast-fade-leave-to {
  opacity: 0;
}
</style>
