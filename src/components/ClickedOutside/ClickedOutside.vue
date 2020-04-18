<template>
  <div v-on="clickOutsideEvent">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

enum TouchEvent {
  TOUCH_START = 'touchstart',
  MOUSE_DOWN = 'mousedown',
}

@Component
export default class ClickedOutside extends Vue {
  @Prop({ default: () => {} }) readonly onClickOutside!: () => void;

  private isClickedInside: boolean = false;
  private touchEvent: null | TouchEvent = null;

  public onDocumentClick() {
    this.isClickedInside
      ? (this.isClickedInside = false)
      : this.onClickOutside();
  }

  mounted() {
    this.touchEvent =
      'ontouchstart' in window ? TouchEvent.TOUCH_START : TouchEvent.MOUSE_DOWN;
  }

  updated() {
    if (this.touchEvent) {
      window.addEventListener(this.touchEvent, this.onDocumentClick);
    }
  }

  beforeDestroy() {
    if (this.touchEvent) {
      window.removeEventListener(this.touchEvent, this.onDocumentClick);
    }
  }

  get clickOutsideEvent(): Record<string, Function | Function[]> {
    if (!this.touchEvent) return this.$listeners;

    return Object.assign({}, this.$listeners, {
      [this.touchEvent]: () => {
        this.isClickedInside = true;
      },
    });
  }
}
</script>
