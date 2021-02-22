<template>
  <img
    v-if="language"
    :src="language.icon"
    :alt="language.name"
    :width="size"
    :height="size"
  />
</template>

<script>
export default {
  props: {
    programmingLanguage: {
      type: Array,
      default: () => null,
    },
    size: {
      type: String,
      default: '24',
    },
  },
  computed: {
    language() {
      try {
        const [name] = this.$props.programmingLanguage;
        return {
          icon: require(`@/assets/svgs/prog-languages/${name.toLowerCase()}.svg`),
          name,
        };
      } catch (err) {
        return null;
      }
    },
  },
};
</script>
