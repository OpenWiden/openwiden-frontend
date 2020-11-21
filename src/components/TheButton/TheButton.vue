<template>
  <component
    :is="href ? 'nuxt-link' : 'button'"
    v-if="isLoading"
    :class="classObj"
    :title="title"
    :type="type"
    :disabled="true"
    :to="href"
  >
    <preloader />
  </component>

  <component
    :is="href ? 'nuxt-link' : 'button'"
    v-else
    :class="classObj"
    :title="title"
    :type="type"
    :disabled="disabled"
    :to="href"
    @click="onClick"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import cssmem from 'cssmem';
import styles from './TheButton.css?module';
import Preloader from '@/src/components/Preloader/Preloader';

enum ButtonType {
  SUBMIT = 'submit',
  BUTTON = 'button',
}

const em = cssmem(styles);

@Component({ components: { Preloader } })
export default class TheButton extends Vue {
  @Prop({ required: true }) title!: string;
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
