<template>
  <div :class="$style.container">
    <transition-group tag="ul" :name="$style.fade">
      <li v-for="item in active" :key="item.id" :data-id="item.id">
        <Toast :message="item.message" :href="getHref(item)" />
      </li>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Toast, { Props as ToastProps } from '../Toast/Toast.vue';
import { events } from './events';

interface Props {
  toast: ToastProps;
  ms?: number;
  state: 'IDLE' | 'DELETED';
}

export default Vue.extend({
  name: 'ToastsGroup',
  components: { Toast },

  props: {
    tost: {
      type: Object as PropType<ToastProps>,
      default: () => {},
      required: false,
    },

    ms: {
      type: Number,
      required: false,
      default: 3500,
    },
  },

  data(): { show: boolean; list: ToastProps[] } {
    return {
      show: false,
      list: [],
    };
  },

  computed: {
    active() {
      return this.$data.list
        .filter(({ state }: Props) => state !== 'DELETED')
        .reverse();
    },
  },

  mounted() {
    events.$on('add', this.addItem);
  },

  methods: {
    addItem({ toast }: Props): void {
      if (!toast) return;

      this.list.push(toast);

      setTimeout(() => {
        this.removeItem(toast.id);
      }, this.$props.ms);
    },

    removeItem(targetId: number) {
      this.list.find((item, index) => {
        if (item.id === targetId) {
          this.$set(this.list, index, { ...item, state: 'DELETED' });
        }
      });
    },

    getHref({ id, state }: ToastProps): string | null {
      return state === 'added' ? `/repo/${id}` : null;
    },
  },
});
</script>

<style module src="./ToastsGroup.module.css" />
