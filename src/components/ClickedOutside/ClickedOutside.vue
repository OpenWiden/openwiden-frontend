<template>
  <div v-on="clickOutsideEvent">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    onClickOutside: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      isClickedInside: false,
      touchEvent: null,
    };
  },
  computed: {
    clickOutsideEvent() {
      if (!this.touchEvent) return this.$listeners;

      return Object.assign({}, this.$listeners, {
        [this.touchEvent]: () => {
          this.isClickedInside = true;
        },
      });
    },
  },
  mounted() {
    this.touchEvent = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
  },
  updated() {
    window.addEventListener(this.touchEvent, this.onDocumentClick);
  },
  methods: {
    onDocumentClick() {
      if (this.isClickedInside) {
        this.isClickedInside = false;
      } else {
        this.$props.onClickOutside();
      }
    },
  },
};
</script>
