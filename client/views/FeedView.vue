<script setup lang="ts">
import Feed from "@/components/Feed/FeedComponent.vue";
</script>

<template>
  <div class="main">
    <div class="container">
      <Feed />
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
}
.container {
  max-width: 750px;
  width: 100%;
  display: flex;
  align-items: center;
}
</style>
