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
  padding: 0 30px;
}
</style>
