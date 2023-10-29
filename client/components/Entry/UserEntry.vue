<script setup lang="ts">
import { formatDate } from "@/utils/formatDate";

const props = defineProps(["entry"]);
</script>

<template>
  <div class="container">
    <div class="entry-container">
      <p class="prompt">{{ props.entry.prompt }}</p>
      <hr />
      <p class="response">{{ props.entry.response }}</p>
    </div>
    <div class="timestamp">
      <p v-if="props.entry.dateCreated !== props.entry.dateUpdated">{{ formatDate(props.entry.dateUpdated) }} (edited)</p>
      <p v-else>{{ formatDate(props.entry.dateCreated) }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
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
  border: 1px solid #000;
  background: radial-gradient(circle, rgba(255, 253, 250, 1) 0%, rgba(255, 246, 216, 1) 100%);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding-top: 10px;
  padding-bottom: 10px;
}
hr {
  border: 0.5px solid #ccc; /* You can adjust the thickness (1px) if needed */
  margin: 0px;
}
p {
  margin: 0px;
  margin-left: 10px;
  margin-right: 10px;
}
.prompt {
  font-weight: bold;
  text-align: left;
}

.response {
  margin-top: 10px;
  text-align: left;
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
  max-width: 750px;
  width: 100%;
  text-align: left;
  font-size: 0.9em;
  font-style: italic;
  margin-bottom: 5px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
