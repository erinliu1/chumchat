<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const error = ref("");
const name = ref("");
const bio = ref("");
const profileImg = ref("");

async function getRandomProfileImg() {
  profileImg.value = await fetchy("api/profiles/randomImg", "GET", {});
}

async function register() {
  try {
    await userStore.createUser(username.value, password.value);
    await userStore.loginUser(username.value, password.value);
    void userStore.updateSession();
  } catch (e) {
    error.value = e instanceof Error ? e.message : "An error occurred";
  }
}

async function createProfile() {
  try {
    await fetchy("api/profiles", "POST", {
      body: {
        name: name.value,
        bio: bio.value,
        profileImg: profileImg.value,
      },
    });
    void router.push({ name: "Home" });
  } catch (e) {
    error.value = e instanceof Error ? e.message : "An error occurred";
  }
}
</script>

<template>
  <main v-if="!isLoggedIn" class="column">
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
  <main v-else class="column">
    <h2>Create Your Profile</h2>
    <form class="pure-form pure-form-aligned" @submit.prevent="createProfile">
      <img :src="profileImg" />
      <div class="fields">
        <div class="field">
          <label for="name">Display Name</label>
          <input v-model.trim="name" type="text" class="name" />
        </div>
        <div class="field">
          <label for="bio">Write a short bio</label>
          <textarea id="bio" v-model="bio" placeholder="tell us about yourself!"></textarea>
        </div>
        <div class="field">
          <label for="profileImg">Paste a URL link to an image for your profile picture</label>
          <input v-model.trim="profileImg" type="text" class="profileImg" />
        </div>
        <div class="randomizePfp">
          <button id="pfp" type="button" @click="getRandomProfileImg">Randomize Profile Image</button>
        </div>
      </div>
      <button type="submit">Save</button>
    </form>
  </main>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

textarea {
  height: 200px;
}
.fields {
  margin: 0px;
  padding: 0px;
  gap: 10px;
  display: flex;
  flex-direction: column;
}
.field {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

img {
  background-color: rgb(255, 255, 255);
  width: 175px;
  height: 175px;
  border-radius: 50%;
}
.randomizePfp {
  display: flex;
  justify-content: center;
}

#pfp {
  background-color: transparent;
  border: 0px;
  margin: 0px;
  padding: 0px;
  width: fit-content;
}
#pfp:hover {
  color: black;
  text-decoration: underline;
}
</style>
