<template>
  <Popup v-if="trigger && loaded" :friends="friends" @cancel="togglePopup" @private="handlePrivateShare" @public="handlePublicShare" @message="handleMessage" />
  <div class="form">
    <textarea id="response" v-model="response" placeholder="Type your thoughts here..." required> </textarea>
    <div class="btn-container">
      <button @click="togglePopup">
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
  </div>
  <div class="m" v-if="messageSent">Message sent successfully!</div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import Popup from "@/components/Popup/PopupContainer.vue";

const props = defineProps(["prompt"]);
const response = ref("");
const entryId = ref("");
const emit = defineEmits(["createdNewEntry"]);
const trigger = ref(false);
const friends = ref("");
const loaded = ref(false);
const messageSent = ref(false);

const togglePopup = () => {
  trigger.value = !trigger.value;
};

async function getFriends() {
  let results;
  try {
    results = await fetchy(`api/friends`, "GET");
  } catch (_) {
    return;
  }
  friends.value = results;
}

const handlePublicShare = async () => {
  await createEntry();
  try {
    await fetchy("api/visibility", "POST", {
      body: {
        contentId: entryId.value,
      },
    });
  } catch (_) {
    return;
  }
  emptyForm();
  togglePopup();
};

const handlePrivateShare = async () => {
  await createEntry();
  emptyForm();
  togglePopup();
};

const handleMessage = async (friend: string) => {
  await createEntry();
  try {
    await fetchy("api/messages", "POST", {
      body: {
        recipientUsername: friend,
        content: entryId.value,
      },
    });
    messageSent.value = true;
  } catch (e) {
    console.log(e);
    return;
  }
  emptyForm();
  togglePopup();
};

const createEntry = async () => {
  let entry;
  try {
    entry = await fetchy("api/entries", "POST", {
      body: {
        prompt: await props.prompt.prompt,
        response: response.value,
      },
    });
    emit("createdNewEntry");
    entryId.value = entry.entry._id;
  } catch (e) {
    console.log(e);
    return;
  }
};

const emptyForm = () => {
  response.value = "";
  entryId.value = "";
};

onBeforeMount(async () => {
  await getFriends();
  loaded.value = true;
});
</script>

<style scoped>
.m {
  width: 100%;
  text-align: center;
  margin-top: 10px;
  color: green;
}
.form {
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
