<script setup lang="ts">
const emit = defineEmits(["cancel", "public", "private"]);
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
      </div>
      <div class="buttons">
        <button @click="emit('cancel')" class="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
