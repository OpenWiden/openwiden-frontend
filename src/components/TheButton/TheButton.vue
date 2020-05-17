<template>
  <button
    :class="{ [$style.button]: true, [$style.disabled]: disabled }"
    :title="title"
    :type="type"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

enum ButtonType {
  SUBMIT = 'submit',
  BUTTON = 'button',
}

@Component
export default class TheButton extends Vue {
  @Prop({ required: true }) title!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: ButtonType.BUTTON }) type!: ButtonType;
  @Prop() onClick!: () => void;
}
</script>

<style module scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  background-color: var(--primary-bg-button);
  border: unset;
  border-radius: var(--primary-border-radius-button);
  font-family: inherit;
  font-size: initial;
  font-weight: 700;
  color: var(--primary-typo-button);
  cursor: pointer;
  transition: background-color 0.15s;
  outline: none;

  &:hover,
  &:focus {
    background-color: var(--primary-hover-bg-button);
  }
}

.disabled {
  background-color: #8a4dee;
  opacity: 0.5;
  cursor: no-drop;

  &:hover,
  &:focus {
    background-color: #8a4dee;
  }
}
</style>
