<script setup lang="ts">
import EntryComponent from "@/components/Entry/EntryContainer.vue";
// import PostListComponent from "@/components/Post/PostListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>Home</h1>
    <!-- <PostListComponent /> -->
    <EntryComponent />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
