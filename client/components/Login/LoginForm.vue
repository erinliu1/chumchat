<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const { loginUser, updateSession } = useUserStore();
const error = ref(""); // Store the error message

async function login() {
  try {
    await loginUser(username.value, password.value);
    void updateSession();
    void router.push({ name: "Home" });
  } catch (e) {
    error.value = e instanceof Error ? e.message : "An error occurred";
  }
}
</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="login">
    <div class="field">
      <label for="aligned-name">Username</label>
      <input v-model.trim="username" type="text" id="aligned-name" placeholder="Username" required />
    </div>
    <div class="field">
      <label for="aligned-password">Password</label>
      <input type="password" v-model.trim="password" id="aligned-password" placeholder="Password" required />
    </div>
    <div class="buttons">
      <button type="submit">Submit</button>
    </div>
  </form>
  <div v-if="error">{{ error }}</div>
</template>

<style scoped>
h3 {
  display: flex;
  justify-content: center;
}
</style>

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
