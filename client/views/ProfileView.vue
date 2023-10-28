<script setup lang="ts">
import UserProfile from "@/components/Profile/UserProfile.vue";
</script>

<template>
  <div class="main">
    <div class="container">
      <UserProfile :username="$route.query.username" />
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
