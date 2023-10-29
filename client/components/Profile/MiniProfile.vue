<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";
import { onBeforeMount, ref } from "vue";

const loaded = ref(false);
let profile = ref({ profileImg: "", name: "", bio: "" });
const { username } = defineProps(["username"]);

async function getProfile(username: string) {
  let results;
  try {
    let query: Record<string, string> = { username };
    results = await fetchy("api/profiles", "GET", { query });
  } catch (_) {
    return;
  }
  profile.value = results;
}

onBeforeMount(async () => {
  await getProfile(username);
  loaded.value = true;
});
</script>

<template>
  <div class="c">
    <img :src="profile.profileImg" class="pfp" />
  </div>
</template>

<style scoped>
.c {
  display: flex;
  flex-direction: row;
}
img {
  background-color: rgb(255, 255, 255);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid black;
  margin: 0px;
}
.username {
  margin: 0px;
  padding: 0px;
}
</style>
