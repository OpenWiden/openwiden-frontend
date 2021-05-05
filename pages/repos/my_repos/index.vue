<template>
  <section :class="styles.addRepo">
    <block-wrapper size="tablet" :class="styles.wrapper">
      <transition appear @before-enter="beforeEnter" @enter="enter">
        <the-text tag="h1" size="h2" :with-underlay="true">
          My repositories
        </the-text>
      </transition>

      <transition appear @before-enter="beforeEnter" @enter="enterP">
        <the-text tag="p" :class="styles.subtitle">
          You can add your repositories to OpenWiden from any connected version
          control system. <br />
          Also, you are able to have more than one active connection with vsc at
          the same time.
        </the-text>
      </transition>

      <user-repos />
    </block-wrapper>
  </section>
</template>

<script>
import gsap from 'gsap';
import styles from './index.css?module';
import TheText from '@/src/components/TheText/TheText';
import BlockWrapper from '@/src/components/BlockWrapper/BlockWrapper';
import UserRepos from '@/src/components/UserRepos/UserRepos';
import { DATA_STATUS, DEFAULT_DATA_OBJECT } from '@/src/interfaces/Data';

export default {
  components: {
    TheText,
    BlockWrapper,
    UserRepos,
  },
  data() {
    return {
      DATA_STATUS,
      repos: DEFAULT_DATA_OBJECT,
      repoErr: null,
      pagination: {
        previous: null,
        next: null,
      },
    };
  },
  computed: {
    styles() {
      return styles;
    },
  },
  methods: {
    beforeEnter(el) {
      el.style.transform = 'translateY(-20px)';
      el.style.opacity = 0;
    },
    enter(el, done) {
      gsap.to(el, { duration: 1, opacity: 1, y: 0, onComplete: done });
    },
    enterP(el, done) {
      gsap.to(el, {
        delay: 0.5,
        duration: 1,
        opacity: 1,
        y: 0,
        onComplete: done,
      });
    },
  },
};
</script>
