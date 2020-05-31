<template>
  <button
    v-if="!href"
    :class="{ [styles.button]: true, [styles.disabled]: disabled }"
    :title="title"
    :type="type"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>

  <nuxt-link
    v-else
    :class="{ [styles.button]: true, [styles.disabled]: disabled }"
    :title="title"
    :disabled="disabled"
    :to="href"
  >
    <slot />
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import styles from './TheButton.css?module';

enum ButtonType {
  SUBMIT = 'submit',
  BUTTON = 'button',
}

@Component
export default class TheButton extends Vue {
  @Prop({ required: true }) title!: string;
  @Prop() href!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: ButtonType.BUTTON }) type!: ButtonType;
  @Prop() onClick!: () => void;

  get styles() {
    return styles;
  }
}
</script>
