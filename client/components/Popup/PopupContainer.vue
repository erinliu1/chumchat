<script setup lang="ts">
const emit = defineEmits(["cancel", "public", "private", "message"]);
const { friends } = defineProps(["friends"]);
import { ref } from "vue";
const dropdown = ref(false);
const toggleDropdown = () => {
  dropdown.value = !dropdown.value;
};
</script>

<template>
  <div class="popup">
    <div class="popup-inner">
      <h3>Select the visibility of this entry</h3>
      <div class="options">
        <button @click="emit('private')" class="optionButton" id="private">
          <b>Private (only you can see this)</b>
        </button>
        <button @click="emit('public')" class="optionButton" id="public">
          <b>Share to all chums</b>
        </button>
        <button @click="toggleDropdown" class="optionButton" id="message">
          <b>Send as a special message</b>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-icon">
            <path d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"></path>
          </svg>
        </button>
        <div v-if="dropdown">
          <div class="friends" v-for="friend in friends" :key="friend">
            <button @click="emit('message', friend)" class="friend">Send to @{{ friend }}</button>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button @click="emit('cancel')" class="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.friend {
  background-color: transparent;
  border: 0px;
  margin: 0px;
  padding: 0px;
  width: fit-content;
  box-shadow: none;
}
.friend:hover {
  color: black;
  text-decoration: underline;
}
.friends {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-inner {
  background: white;
  padding: 32px;
  border: 1px solid #000;
  background: radial-gradient(circle, rgb(255, 255, 255) 0%, rgb(216, 243, 255) 100%);
  border-radius: 1em;
}
.buttons {
  display: flex;
  justify-content: center;
  gap: 30px;
}
.share {
  width: 150px;
  padding: 10px;
}
.cancel {
  width: 150px;
  padding: 10px;
}
.options {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  margin-bottom: 30px;
}
.optionButton {
  width: 100%;
  border: none;
  border-radius: 0.5em;
  box-shadow: none;
  text-align: left;
  display: flex;
  align-items: center;
}

.svg-icon {
  width: 20px;
  height: 20px;
  margin-left: 8px;
}
#private {
  background: radial-gradient(circle, rgb(255, 246, 253) 0%, rgb(255, 228, 248) 100%);
}
#private:hover {
  background: rgb(255, 181, 218);
  color: black;
}
#public {
  background: radial-gradient(circle, rgb(251, 255, 250) 0%, rgb(224, 255, 219) 100%);
}
#public:hover {
  background: rgb(181, 255, 190);
  color: black;
}
#message {
  background: radial-gradient(circle, rgb(252, 250, 255) 0%, rgb(232, 219, 255) 100%);
}
#message:hover {
  background: rgb(195, 181, 255);
  color: black;
}
</style>
