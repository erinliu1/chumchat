<script setup lang="ts">
import RegisterForm from "@/components/Login/RegisterForm.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import router from "@/router";

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);

// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in
  }
  if (isLoggedIn.value) {
    void router.push("/home");
  }
});
</script>

<template>
  <RegisterForm />
</template>
