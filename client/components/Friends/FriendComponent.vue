<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";
import { onBeforeMount, ref } from "vue";
import router from "../../router";

const { friend } = defineProps(["friend"]);
const emit = defineEmits(["delete"]);
const loaded = ref(false);
let profile = ref({ profileImg: "", name: "", bio: "" });

async function viewProfile() {
  void router.push({ name: "Profile", query: { username: friend } });
}

async function removeFriend() {
  try {
    await fetchy(`api/friends/${friend}`, "DELETE");
  } catch (_) {
    return;
  }
  emit("delete");
}

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
  await getProfile(friend);
  loaded.value = true;
});
</script>

<template>
  <div class="all">
    <div v-if="loaded" class="loaded">
      <div class="button">
        <button class="remove" @click="removeFriend">Remove Friend</button>
      </div>
      <div class="friendContainer">
        <div class="friend">
          <div class="left">
            <p>
              <b>@{{ friend }}</b>
            </p>
            <img :src="profile.profileImg" class="pfp" />
          </div>
          <div class="right">
            <button class="view" @click="viewProfile">View Profile</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.friendContainer {
  display: flex;
  justify-content: center;
}
.loaded {
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
p {
  margin: 0px;
  margin-bottom: 2px;
}
.left {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 30%;
  height: 100%;
}
.friend {
  width: 100%;
  display: flex;
  justify-content: center;
  border: 1px solid black;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid #000;
  border-radius: 1em;
  background: radial-gradient(circle, rgba(255, 253, 250, 1) 0%, rgba(255, 246, 216, 1) 100%);
  margin-bottom: 15px;
}
.all {
  width: 100%;
  display: flex;
  justify-content: center;
}
img {
  background-color: rgb(255, 255, 255);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid black;
}
.remove {
  background-color: transparent;
  border: 0px;
  margin: 0px;
  padding: 0px;
  width: fit-content;
}
.remove:hover {
  color: black;
  text-decoration: underline;
}
.button {
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}
.view {
  width: fit-content;
  height: fit-content;
  padding: 10px;
}
</style>
