<template>
  <img
    v-if="user"
    :class="$style.avatar"
    :src="user.avatar"
    :alt="`${user.username} avatar`"
  />
</template>

<script>
export default {
  computed: {
    user({ $store }) {
      return $store.state.user;
    },
  },
};
</script>

<style module scoped>
.avatar {
  width: 32px;
  height: 32px;
  background-color: var(--bg-avatar);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 100%;
}
</style>
