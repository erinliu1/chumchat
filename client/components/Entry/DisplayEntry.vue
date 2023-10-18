<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";
import { formatDate } from "@/utils/formatDate";

const props = defineProps(["entry"]);
const emit = defineEmits(["editEntry", "refreshEntries"]);
const { currentUsername } = storeToRefs(useUserStore());

const deletePost = async () => {
  try {
    await fetchy(`api/entries/${props.entry._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshEntries");
};
</script>

<template>
  <div>
    <p class="prompt">{{ props.entry.prompt }}</p>
    <p class="response">{{ props.entry.response }}</p>
    <div class="base">
      <menu v-if="props.entry.author == currentUsername">
        <li><button class="btn-small pure-button" @click="emit('editEntry', props.entry._id)">Edit</button></li>
        <li><button class="button-error btn-small pure-button" @click="deletePost">Delete</button></li>
      </menu>
      <article class="timestamp">
        <p v-if="props.entry.dateCreated !== props.entry.dateUpdated">Edited on: {{ formatDate(props.entry.dateUpdated) }}</p>
        <p v-else>Created on: {{ formatDate(props.entry.dateCreated) }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
p {
  margin: 0em;
}

.prompt {
  font-weight: bold;
}
div {
  width: 100%;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.timestamp {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
