<script setup lang="ts">
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { toast } = storeToRefs(useToastStore());

// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in
  }
});
</script>

<template>
  <header v-if="isLoggedIn && currentRouteName !== 'Start' && currentRouteName !== 'Register' && currentRouteName !== 'Login'">
    <nav>
      <div class="title">
        <RouterLink id="logo" :to="{ name: 'Home' }">
          <img src="@/assets/images/logo.png" />
          <h1>ChumChat</h1>
        </RouterLink>
      </div>
      <ul>
        <li>
          <RouterLink :to="{ name: 'Home' }" id="p" :class="{ underline: currentRouteName == 'Home' }"> Home </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'Feed' }" id="p" :class="{ underline: currentRouteName == 'Feed' }"> Feed </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'Friends' }" id="p" :class="{ underline: currentRouteName == 'Friends' }"> Friends </RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Settings' }" id="p" :class="{ underline: currentRouteName == 'Settings' }"> Settings </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
@import "./assets/toast.css";

#logo {
  display: flex;
  gap: 5px;
}
nav {
  padding: 1em 2em;
  display: flex;
  align-items: center;
}

h1 {
  margin: 0;
}

#p {
  font-size: 1.3rem;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

img {
  height: 2em;
}

a {
  font-size: large;
  color: black;
  text-decoration: none;
}

ul {
  list-style-type: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;
}

.underline {
  text-decoration: underline;
}

@media (max-width: 750px) {
  h1 {
    display: none;
  }
  nav {
    font-size: 1rem;
    padding: 15px;
  }
  ul {
    gap: 10px;
  }
}
</style>
