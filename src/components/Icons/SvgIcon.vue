<template>
  <svg :width="iconSize" :height="iconSize" :viewBox="viewBox" :fill="color">
    <slot />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: [Number, String],
      default: 16,
      required: false,
    },
    viewBox: {
      type: String,
      default: '',
      required: true,
    },
    color: {
      type: String,
      default: 'currentColor',
      required: false,
    },
  },
  computed: {
    iconSize() {
      return this.$props.size + 'px';
    },
  },
};
</script>
