<template>
  <component
    :is="href ? 'nuxt-link' : 'button'"
    :class="classObj"
    :title="title"
    :type="type"
    :disabled="disabled"
    :to="href"
    :aria-label="ariaLabel"
    @click="onClick"
  >
    <preloader v-if="isLoading" />
    <slot v-else />
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import cssmem from 'cssmem';
import styles from './TheButton.css?module';
import Preloader from '@/src/components/Preloader/Preloader.vue';

enum ButtonType {
  SUBMIT = 'submit',
  BUTTON = 'button',
}

const em = cssmem(styles);

@Component({ components: { Preloader } })
export default class TheButton extends Vue {
  @Prop({ required: true }) title!: string;
  @Prop({ required: false }) ariaLabel!: string;

  @Prop() href!: string;

  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: false }) isLoading!: boolean;
  @Prop({ default: false }) isTransparent!: boolean;

  @Prop({ default: ButtonType.BUTTON }) type!: ButtonType;

  @Prop() onClick!: () => void;

  get styles() {
    return styles;
  }

  get classObj() {
    return em('button')({
      transparent: this.isTransparent,
      disabled: this.disabled,
    });
  }
}
</script>
