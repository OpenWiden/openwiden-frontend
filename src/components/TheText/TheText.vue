<template>
  <component :is="tag" :class="classObject"><slot /></component>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import cssmem from 'cssmem';
import styles from './TheText.css?module';

const em = cssmem(styles);

enum Tag {
  SPAN = 'span',
  P = 'p',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
}

enum Size {
  SPAN = 'span',
  P = 'p',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
}

export default Vue.extend({
  name: 'TheText' as string,
  props: {
    tag: {
      type: String as PropType<Tag>,
      default: Tag.P,
    },
    size: {
      type: String as PropType<Size>,
      default: null,
    },
    visuallyHidden: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classObject() {
      const { tag, size, visuallyHidden } = this.$props;
      return em('text')({ size: size || tag, visuallyHidden });
    },
    styles() {
      return styles;
    },
  },
});
</script>
