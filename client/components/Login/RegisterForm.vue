<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const error = ref(""); // Store the error message

async function register() {
  try {
    await userStore.createUser(username.value, password.value);
    await userStore.loginUser(username.value, password.value);
    void userStore.updateSession();
    void router.push({ name: "Home" });
  } catch (e) {
    error.value = e instanceof Error ? e.message : "An error occurred";
  }
}
</script>

<template>
  <main class="column">
    <h1>Register</h1>
    <form class="pure-form pure-form-aligned" @submit.prevent="register">
      <div class="field">
        <label for="aligned-name">Username</label>
        <input v-model.trim="username" type="text" id="aligned-name" placeholder="Username" required />
      </div>
      <div class="field">
        <label for="aligned-password">Password</label>
        <input type="password" v-model.trim="password" id="aligned-password" placeholder="Password" required />
      </div>
      <div class="buttons">
        <button type="submit">Register</button>
      </div>
    </form>
    <div v-if="error">{{ error }}</div>
  </main>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.field {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
}
</style>
