<template>
  <form @submit.prevent="createEntry(response)">
    <textarea id="response" v-model="response" placeholder="Type your thoughts here..." required> </textarea>
    <button type="submit" class="pure-button-primary pure-button">Share</button>
  </form>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["prompt"]);
const response = ref("");
const createEntry = async (response: string) => {
  try {
    await fetchy("api/entries", "POST", {
      body: {
        prompt: await props.prompt.prompt,
        response: response,
      },
    });
  } catch (_) {
    return;
  }
  emptyForm();
};

const emptyForm = () => {
  response.value = "";
};
</script>

<style scoped>
form {
  max-width: 700px;
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background-color: var(--base-bg);
  border-radius: 1em;
  gap: 0.5em;
  padding: 1em;
}

textarea {
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}

button {
  margin-left: auto;
}
</style>
