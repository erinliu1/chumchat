<script setup lang="ts">
import CreateEntry from "@/components/Entry/CreateEntry.vue";
import DisplayEntry from "@/components/Entry/DisplayEntry.vue";
import EditEntry from "@/components/Entry/EditEntry.vue";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";

const loaded = ref(false);
let displayedPrompt = ref({ msg: "", prompt: "" });

async function getRandomPrompt() {
  let prompt;
  try {
    prompt = await fetchy("api/prompts/random", "GET");
    displayedPrompt.value = prompt;
  } catch (_) {
    return;
  }
}

onBeforeMount(async () => {
  displayedPrompt.value = await fetchy("api/prompts", "GET");
  await getEntries();
  loaded.value = true;
});

let entries = ref<Array<Record<string, string>>>([]);
let editing = ref("");
let searchAuthor = ref("");

async function getEntries(author?: string) {
  let query: Record<string, string> = author !== undefined ? { author } : {};
  let results;
  try {
    results = await fetchy("api/entries", "GET", { query });
  } catch (_) {
    return;
  }
  searchAuthor.value = author ? author : "";
  entries.value = results;
}

function updateEditing(id: string) {
  editing.value = id;
}

async function handleNewEntry() {
  await getRandomPrompt();
  await getEntries();
}
</script>

<template>
  <div class="container">
    <div class="prompt">
      <p v-if="loaded">{{ displayedPrompt.prompt }}</p>
      <button @click="getRandomPrompt">Get a New Prompt</button>
    </div>
    <CreateEntry :prompt="displayedPrompt" @createdNewEntry="handleNewEntry" />
    <div class="entryList">
      <h1>Your Entries</h1>
      <section class="entries" v-if="loaded && entries.length !== 0">
        <div v-for="entry in entries" :key="entry._id">
          <DisplayEntry v-if="editing !== entry._id" :entry="entry" @refreshEntries="getEntries" @editEntry="updateEditing" />
          <EditEntry v-else :entry="entry" @refreshEntries="getEntries" @editEntry="updateEditing" />
        </div>
      </section>
      <p v-else-if="loaded">No entries found</p>
      <p v-else>Loading...</p>
    </div>
  </div>
</template>

<style scoped>
div {
  max-width: 750px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  display: flex;
}
.prompt {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
}

p {
  font-weight: bold;
  margin: 0px;
  padding: 0px;
}

button {
  margin-left: auto;
  width: fit-content;
  padding: 4px;
  font-size: 0.9rem;
}

section {
  display: flex;
  flex-direction: column;
}
.entryList {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  padding: 0px;
}
.entries {
  margin: 0px;
  padding: 0px;
}
</style>
