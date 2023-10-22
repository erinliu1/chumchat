<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["entry"]);
const response = ref(props.entry.response);
const emit = defineEmits(["editEntry", "refreshEntries"]);

const editEntry = async (response: string) => {
  try {
    await fetchy(`api/entries/${props.entry._id}`, "PATCH", { body: { response: response } });
  } catch (e) {
    return;
  }
  emit("editEntry");
  emit("refreshEntries");
};
</script>

<template>
  <div class="container">
    <div class="entry-container">
      <form @submit.prevent="editEntry(response)">
        <p>{{ $props.entry.prompt }}</p>
        <textarea id="response" v-model="response" :placeholder="response" required></textarea>
        <div class="base">
          <menu>
            <li><button type="submit">Save</button></li>
            <li><button @click="emit('editEntry')">Cancel</button></li>
          </menu>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
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
.entry-container {
  width: 100%;
  padding: 10px;
  border: 1px solid #000;
  background: radial-gradient(circle, rgba(255, 253, 250, 1) 0%, rgba(255, 246, 216, 1) 100%);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  margin: 0;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}

p {
  margin: 0em;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}
</style>
