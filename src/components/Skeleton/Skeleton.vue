<template>
  <div :class="classObject" />
</template>

<script>
import cssmem from 'cssmem';
import styles from './Skeleton.css?module';

const em = cssmem(styles);

export default {
  props: {
    isCircle: {
      type: Boolean,
      default: false,
    },
    isLine: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classObject() {
      const { isCircle, isLine } = this.$props;

      return em('skeleton')({ line: isLine, circle: isCircle });
    },
    styles() {
      return styles;
    },
  },
};
</script>
