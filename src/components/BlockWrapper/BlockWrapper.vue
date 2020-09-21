<template>
  <div :class="emWrapper">
    <div :class="emContentWrapper">
      <slot />
    </div>
  </div>
</template>

<script>
import cssmem from 'cssmem';
import styles from './BlockWrapper.css?module';

const em = cssmem(styles);

export default {
  props: {
    size: {
      default: 'desktop',
      type: String,
    },

    withBackground: {
      default: true,
      type: Boolean,
    },
  },
  computed: {
    emWrapper() {
      const { size } = this.$props;

      return em('wrapper')({ size });
    },
    emContentWrapper() {
      const { withBackground } = this.$props;

      return em('contentWrapper')({ withBackground });
    },
    styles() {
      return styles;
    },
  },
};
</script>
