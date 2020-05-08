<template>
  <div>
    <main-screen />
    <repos-list />
  </div>
</template>

<script>
import MainScreen from '@/src/components/MainScreen/MainScreen';
import ReposList from '@/src/components/ReposList/ReposList';

export default {
  components: {
    MainScreen,
    ReposList,
  },
};
</script>
