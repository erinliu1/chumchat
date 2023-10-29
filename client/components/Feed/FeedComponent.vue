<script setup lang="ts">
import UserEntry from "@/components/Entry/UserEntry.vue";
import MiniProfile from "@/components/Profile/MiniProfile.vue";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "@/utils/fetchy";

const loaded = ref(false);
let entries = ref([{ _id: "", author: "" }]);
let messages = ref([{ _id: "", content: "", sender: "" }]);

async function getMessages() {
  let results;
  try {
    results = await fetchy("api/messages/received", "GET");
  } catch (e) {
    console.log(e);
    return;
  }
  messages.value = results.messages;
}

async function getEntries() {
  let results;
  try {
    results = await fetchy("api/visibility", "GET");
  } catch (e) {
    console.log(e);
    return;
  }
  entries.value = results;
}

onBeforeMount(async () => {
  await getEntries();
  await getMessages();
  loaded.value = true;
});
</script>

<template>
  <div v-if="loaded" class="container">
    <div class="entryList" id="messages">
      <h1>Special messages for you</h1>
      <div class="entries" v-if="loaded && messages.length !== 0">
        <div class="entry" v-for="message in messages" :key="message._id">
          <p class="username">
            <b>From @{{ message.sender }}</b>
          </p>
          <div class="d">
            <MiniProfile :username="message.sender" />
            <UserEntry :entry="message.content" />
          </div>
        </div>
      </div>
      <p v-else-if="loaded">No entries found</p>
      <p v-else>Loading...</p>
    </div>
    <div class="entryList" id="notMessages">
      <h1>What your chums are thinking</h1>
      <div class="entries" v-if="loaded && entries.length !== 0">
        <div class="entry" v-for="entry in entries" :key="entry._id">
          <p class="username">
            <b>From @{{ entry.author }}</b>
          </p>
          <div class="d">
            <MiniProfile :username="entry.author" />
            <UserEntry :entry="entry" />
          </div>
        </div>
      </div>
      <p v-else-if="loaded">No entries found</p>
      <p v-else>Loading...</p>
    </div>
  </div>
</template>

<style scoped>
.d {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
.username {
  margin-left: 66px;
  text-align: left;
}
.entries {
  max-width: 750px;
  width: 100%;
}
.entryList {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  padding: 0px;
}
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
img {
  background-color: rgb(255, 255, 255);
  width: 175px;
  height: 175px;
  border-radius: 50%;
  margin-right: 20px;
}
.info {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: fit-content;
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
  margin-bottom: 30px;
}

h3 {
  margin: 0px;
  padding: 0px;
}
.entries {
  margin: 0px;
  padding: 0px;
}
section {
  display: flex;
  flex-direction: column;
}
</style>
