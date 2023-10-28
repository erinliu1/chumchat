<script setup lang="ts">
const { profile, username } = defineProps(["profile", "username"]);
const emit = defineEmits(["editProfile"]);
</script>
<template>
  <div class="button">
    <button class="edit" @click="emit('editProfile')">Edit Profile</button>
  </div>
  <div class="info">
    <img :src="profile.profileImg" class="pfp" />
    <div class="about">
      <h3>@{{ username }}</h3>
      <h1>{{ profile.name }}</h1>
      <p>{{ profile.bio }}</p>
    </div>
  </div>
</template>

<style scoped>
img {
  background-color: rgb(255, 255, 255);
  width: 175px;
  height: 175px;
  border-radius: 50%;
  margin-bottom: 50px;
  margin-right: 20px;
}
.info {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.about {
  height: 175px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
p {
  margin: 0px;
  margin-top: 5px;
  padding: 0px;
}
h1 {
  margin: 0px;
  padding: 0px;
}

h3 {
  margin: 0px;
  padding: 0px;
}

.button {
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: flex-end;
}

.edit {
  background-color: transparent;
  border: 0px;
  margin: 0px;
  padding: 0px;
  width: fit-content;
}
.edit:hover {
  color: black;
  text-decoration: underline;
}
</style>
