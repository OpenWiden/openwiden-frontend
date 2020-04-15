<template>
  <button :class="$style.button" :title="title" :type="type"><slot /></button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class TheButton extends Vue {
  @Prop({ required: true }) title!: string;
  @Prop({ required: true }) type!: 'button' | 'submit';
}
</script>

<style module scoped>
.button {
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
</style>
