<template>
  <section :class="styles.section">
    <div :class="styles.wrapper">
      <div :class="styles.illustration">
        <div :class="styles.bg" />

        <img
          v-if="activeSlide"
          :src="`/svgs/${activeSlide.img}`"
          :class="[styles.image]"
          width="263"
          height="197"
          alt="How it works illustration"
          aria-hidden="true"
        />

        <div :class="[styles.ring, styles.top]" />
        <div :class="[styles.ring, styles.bottom]" />

        <div :class="[styles.square, styles.top]" />
        <div :class="[styles.square, styles.middle]" />
        <div :class="[styles.square, styles.bottom]" />

        <div :class="[styles.circle, styles.left]" />
        <div :class="[styles.circle, styles.left2]" />

        <div :class="[styles.circle, styles.right]" />
        <div :class="[styles.circle, styles.right2]" />
      </div>

      <div :class="styles.slider">
        <the-text :class="styles.title" tag="h2">
          How it works
        </the-text>

        <ul :class="styles.list">
          <li v-for="slide in slides" :key="slide.label" :class="[styles.item]">
            <button
              :class="[
                styles.button,
                activeSlide && slide.id === activeSlide.id ? styles.active : '',
              ]"
              @click="() => changeActiveSlide(slide)"
            >
              <the-text :class="styles.label" tag="span">
                {{ slide.label }}
              </the-text>

              <the-text :class="styles.text">
                {{ slide.text }}
              </the-text>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import styles from './HowItWorks.css?module';
import TheText from '@/src/components/TheText/TheText';

export default {
  components: { TheText },
  data() {
    return {
      slides: [
        {
          id: 1,
          label: 'Authorization',
          img: 'auth.svg',
          text: 'You are able to authorize with github or gitlab accounts',
        },
        {
          id: 2,
          label: 'Find repository',
          img: 'list.svg',
          text:
            'Find repositories you would like to help. You can filter by language, stars or issues count',
        },
        {
          id: 3,
          label: 'Add repository',
          img: 'add.svg',
          text:
            'If you want to find an open source help for your project you are able to add your repository to our service from any connected version control system.',
        },
      ],
      activeSlide: null,
    };
  },
  computed: {
    styles() {
      return styles;
    },
  },
  mounted() {
    this.$data.activeSlide = { ...this.$data.slides[0], isActive: true };
  },
  methods: {
    changeActiveSlide(slide) {
      this.$data.activeSlide = { ...slide, isActive: true };
    },
  },
};
</script>
