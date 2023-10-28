<script setup lang="ts">
import DisplayProfile from "@/components/Profile/DisplayProfile.vue";
import EditProfile from "@/components/Profile/EditProfile.vue";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "@/stores/user";

const loaded = ref(false);
const userStore = useUserStore();
const { currentUsername } = storeToRefs(userStore);
let profile = ref(null);
let editing = ref(false);

async function getProfile(username?: string) {
  let results;
  try {
    let query: Record<string, string> = username === undefined ? { username: currentUsername.value } : { username };
    results = await fetchy("api/profiles", "GET", { query });
  } catch (_) {
    return;
  }
  profile.value = results;
}

function updateEditing() {
  editing.value = !editing.value;
}

onBeforeMount(async () => {
  await userStore.updateSession();
  await getProfile();
  loaded.value = true;
});
</script>

<template>
  <div v-if="loaded" class="container">
    <DisplayProfile v-if="!editing" :profile="profile" :username="currentUsername" @editProfile="updateEditing" />
    <EditProfile v-else :profile="profile" @onSave="updateEditing" @refreshProfile="getProfile" />
  </div>
  <p v-else>Loading...</p>
</template>

<style scoped>
div {
  max-width: 750px;
  width: 100%;
}
.info {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.about {
  height: 175px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
p {
  margin: 0px;
  margin-top: 5px;
  padding: 0px;
}
h1 {
  margin: 0px;
  padding: 0px;
}

h3 {
  margin: 0px;
  padding: 0px;
}

.pfp {
  width: 175px;
  height: 175px;
  border-radius: 50%;
  margin-bottom: 50px;
  margin-right: 20px;
}

button {
  background-color: transparent;
  border: 0px;
  margin: 0px;
  padding: 0px;
  width: fit-content;
}
button:hover {
  color: black;
  text-decoration: underline;
}
.button {
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: flex-end;
}
</style>
