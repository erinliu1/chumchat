<template>
  <form @submit.prevent="createEntry(response)">
    <textarea id="response" v-model="response" placeholder="Type your thoughts here..." required> </textarea>
    <div class="btn-container">
      <button type="submit">
        <span class="text">Share To</span>
        <div class="icon-container">
          <div class="icon icon--left">
            <svg>
              <use xlink:href="#arrow-right"></use>
            </svg>
          </div>
          <div class="icon icon--right">
            <svg>
              <use xlink:href="#arrow-right"></use>
            </svg>
          </div>
        </div>
      </button>
    </div>

    <svg style="display: none">
      <symbol id="arrow-right" viewBox="0 0 20 10">
        <path d="M14.84 0l-1.08 1.06 3.3 3.2H0v1.49h17.05l-3.3 3.2L14.84 10 20 5l-5.16-5z"></path>
      </symbol>
    </svg>
  </form>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["prompt"]);
const response = ref("");
const emit = defineEmits(["createdNewEntry"]);

const createEntry = async (response: string) => {
  try {
    await fetchy("api/entries", "POST", {
      body: {
        prompt: await props.prompt.prompt,
        response: response,
      },
    });
    emit("createdNewEntry");
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
  width: 100vw;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 1em;
  gap: 0.5em;
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

.btn-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-container {
  --btn-bg: #3bac7aff;
}

button {
  margin-left: auto;
  padding: 7px;
  width: 190px;
  font-size: 1.3rem;
  border: 1;
  border-radius: 1.5rem;
  position: relative;
  color: #fff;
  font-weight: bold;
  background: #1c4332ff;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  transition:
    background-color 0.5s ease,
    transform 0.3s ease;
}
button .text,
button .icon-container {
  position: relative;
  z-index: 2;
}
button .icon-container {
  --icon-size: 25px;
  position: relative;
  width: var(--icon-size);
  height: var(--icon-size);
  margin-left: 15px;
  transition: transform 500ms ease;
}
button .icon-container .icon {
  position: absolute;
  left: 0;
  top: 0;
  width: var(--icon-size);
  height: var(--icon-size);
  transition:
    transform 500ms ease,
    opacity 250ms ease;
}
button .icon-container .icon--left {
  transform: translateX(-200%);
  opacity: 0;
}
button .icon-container .icon svg {
  width: 100%;
  height: 100%;
  fill: #1c4332ff;
}
button::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: var(--btn-bg);
  border-radius: 1.5rem;
  z-index: 1;
  transition: transform 500ms ease;
}
button:hover::after {
  transform: translateX(65%);
}
button:hover .icon-container {
  transform: translateX(60%);
}

button:active {
  background-color: white;
  color: black;
  transform: translateY(-5px);
}
</style>
