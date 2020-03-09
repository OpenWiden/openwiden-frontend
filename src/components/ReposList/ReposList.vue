<template>
  <section :class="styles.repos">
    <div :class="styles.wrapper">
      <the-text :class="styles.title" tag="h2"
        >List of projects on GitHub that need your help</the-text
      >

      <ul :class="styles.reposList">
        <li :class="styles.repoItem">
          <div :class="styles.repoHeader">
            <the-text tag="p">Gviddo / Python</the-text>
          </div>
          <div :class="styles.repoDescription">
            <the-text tag="p">
              Is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </the-text>
          </div>
          <footer :class="styles.repoFooter">
            <ul :class="styles.statsList">
              <li :class="styles.statItem">
                <icon-star
                  :class="styles.icon"
                  width="16"
                  height="16"
                  aria-hidden="true"
                />
                <the-text :class="styles.statText" tag="p">
                  25k
                </the-text>
              </li>
              <li :class="styles.statItem">
                <icon-issue
                  :class="styles.icon"
                  width="16"
                  height="16"
                  aria-hidden="true"
                />
                <the-text :class="styles.statText" tag="p">
                  1004
                </the-text>
              </li>
            </ul>
          </footer>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import styles from './ReposList.css?module';
import TheText from '@/src/components/TheText/TheText';
import IconStar from '@/src/components/Icons/IconStar';
import IconIssue from '@/src/components/Icons/IconIssue';

export default {
  components: {
    TheText,
    IconStar,
    IconIssue,
  },
  computed: {
    styles() {
      return styles;
    },
  },
};
</script>
