<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import CreateEntry from "@/components/Entry/CreateEntry.vue";
import EntryList from "@/components/Entry/EntryList.vue";

const loaded = ref(false);
let displayedPrompt = ref({ msg: "", prompt: "" });
const emit = defineEmits(["updatePrompt"]);

async function getRandomPrompt() {
  let prompt;
  try {
    prompt = await fetchy("api/prompts/random", "GET");
    displayedPrompt.value = prompt;
    emit("updatePrompt");
  } catch (_) {
    return;
  }
}

onBeforeMount(async () => {
  await getRandomPrompt();
  loaded.value = true;
});
</script>

<template>
  <div>
    <div class="prompt">
      <p v-if="loaded">{{ displayedPrompt.prompt }}</p>
      <button @click="getRandomPrompt">Get a New Prompt</button>
    </div>
    <CreateEntry :prompt="displayedPrompt" />
    <EntryList />
  </div>
</template>

<style scoped>
div {
  max-width: 700px;
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  display: flex;
}

.prompt {
  border: 1px solid #ccc;
}

p {
  font-weight: bold;
  margin-right: 10px;
}

button {
  margin-left: auto;
}

@media (max-width: 700px) {
  .prompt-container {
    max-width: 100%;
  }
}
</style>
