<script setup lang="ts">
import UserEntry from "@/components/Entry/UserEntry.vue";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "@/utils/fetchy";

const loaded = ref(false);
let entries = ref([{ _id: "", author: "" }]);

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
  loaded.value = true;
});
</script>

<template>
  <div v-if="loaded" class="container">
    <div class="entryList">
      <h1>What your chums are thinking</h1>
      <section class="entries" v-if="loaded && entries.length !== 0">
        <div v-for="entry in entries" :key="entry._id">
          <p class="username">@{{ entry.author }}</p>
          <UserEntry :entry="entry" />
        </div>
      </section>
      <p v-else-if="loaded">No entries found</p>
      <p v-else>Loading...</p>
    </div>
  </div>
</template>

<style scoped>
.username {
  text-align: left;
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
  max-width: 750px;
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
