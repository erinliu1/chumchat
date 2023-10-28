<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import UpdateUserForm from "../components/Setting/UpdateUserForm.vue";

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser } = useUserStore();

async function logout() {
  await logoutUser();
  void router.push("/");
}
</script>

<template>
  <main class="column">
    <h1>Settings for @{{ currentUsername }}</h1>
    <button @click="logout">Logout</button>
    <UpdateUserForm />
  </main>
</template>
