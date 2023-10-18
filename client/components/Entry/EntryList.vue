<script setup lang="ts">
import DisplayEntry from "@/components/Entry/DisplayEntry.vue";
import EditEntry from "@/components/Entry/EditEntry.vue";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";

const loaded = ref(false);
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

onBeforeMount(async () => {
  await getEntries();
  loaded.value = true;
});
</script>

<template>
  <div>
    <h2>Your Entries</h2>
    <section class="entries" v-if="loaded && entries.length !== 0">
      <article v-for="entry in entries" :key="entry._id">
        <DisplayEntry v-if="editing !== entry._id" :entry="entry" @refreshEntries="getEntries" @editEntry="updateEditing" />
        <EditEntry v-else :entry="entry" @refreshEntries="getEntries" @editEntry="updateEditing" />
      </article>
    </section>
    <p v-else-if="loaded">No entries found</p>
    <p v-else>Loading...</p>
  </div>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
div {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center; /* Center the content horizontally */
  text-align: center;
}
h2 {
  width: 100%;
}
section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.entries {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
