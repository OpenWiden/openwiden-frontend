<template>
  <img
    v-if="language"
    :src="language.icon"
    :alt="language.name"
    :width="width"
    :height="height"
  />
</template>

<script>
export default {
  props: {
    programmingLanguage: {
      type: [Object, null],
      default: () => null,
    },
    width: {
      type: String,
      default: '24',
    },
    height: {
      type: String,
      default: '24',
    },
  },
  computed: {
    language() {
      const { name } = this.$props.programmingLanguage;

      try {
        return {
          icon: require(`@/assets/svgs/prog-languages/${name}.svg`),
          name,
        };
      } catch (err) {
        return null;
      }
    },
  },
};
</script>
