<template>
  <div :class="$style.container">
    <transition-group tag="ul" :name="$style.toast">
      <li v-for="item in active" :key="item.message" :data-id="item.id">
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

  data(): { list: ToastProps[] } {
    return {
      list: [],
    };
  },

  computed: {
    active() {
      return [].concat(this.$data.list).reverse();
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

    removeItem(idToRemove: number) {
      const index = this.list.findIndex((item) => item.id === idToRemove);

      this.$delete(this.list, index);
    },

    getHref({ id, state }: ToastProps): string | null {
      return state === 'added' ? `/repo/${id}` : null;
    },
  },
});
</script>

<style module src="./ToastsGroup.module.css" />
