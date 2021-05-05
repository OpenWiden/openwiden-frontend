<template>
  <div>
    <main-screen />
    <how-it-works />
    <repos-list />
  </div>
</template>

<script>
import MainScreen from '@/src/blocks/MainScreen/MainScreen';
import HowItWorks from '@/src/blocks/HowItWorks/HowItWorks';
import ReposList from '@/src/blocks/ReposList/ReposList';

export default {
  components: {
    MainScreen,
    ReposList,
    HowItWorks,
  },
};
</script>
