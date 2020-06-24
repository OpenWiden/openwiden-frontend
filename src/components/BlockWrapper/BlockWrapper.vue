<template>
  <div :class="$style.wrapper">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style module scoped>
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--size-m);
}

@media (min-width: 768px) {
  .wrapper {
    padding: var(--size-l);
  }
}
</style>
