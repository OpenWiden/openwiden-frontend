<template>
  <div>
    <main-screen />
    <how-it-works />
    <repos-list />
  </div>
</template>

<script>
import MainScreen from '@/src/components/MainScreen/MainScreen';
import ReposList from '@/src/components/ReposList/ReposList';
import HowItWorks from '@/src/components/HowItWorks/HowItWorks';

export default {
  components: {
    MainScreen,
    ReposList,
    HowItWorks,
  },
};
</script>
