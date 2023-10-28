<script setup lang="ts">
import { ref, watch } from "vue";
import { fetchy } from "../../utils/fetchy";
const emit = defineEmits(["onSave", "refreshProfile"]);
const { profile } = defineProps(["profile"]);
const name = ref(profile.name);
const bio = ref(profile.bio);
const profileImg = ref(profile.profileImg);
let nameIsEmpty = false;
let bioIsEmpty = false;
let profileImgIsEmpty = false;

async function getRandomProfileImg() {
  profileImg.value = await fetchy("api/profiles/randomImg", "GET", {});
}
const editProfile = async () => {
  if (nameIsEmpty) {
    name.value = " ";
  }
  if (bioIsEmpty) {
    bio.value = " ";
  }
  if (profileImgIsEmpty) {
    profileImg.value = " ";
  }
  await fetchy(`api/profiles`, "PATCH", { body: { name: name.value, bio: bio.value, profileImg: profileImg.value } });
  emit("onSave");
  emit("refreshProfile");
};
watch(name, (newName) => {
  if (newName.toString() === "") {
    nameIsEmpty = true;
  } else {
    nameIsEmpty = false;
  }
});
watch(bio, (newBio) => {
  if (newBio.toString() === "") {
    bioIsEmpty = true;
  } else {
    bioIsEmpty = false;
  }
});
watch(profileImg, (newProfileImg) => {
  if (newProfileImg.toString() === "") {
    profileImgIsEmpty = true;
  } else {
    profileImgIsEmpty = false;
  }
});
</script>
<template>
  <div class="container">
    <form class="pure-form pure-form-aligned" @submit.prevent="editProfile">
      <h2>Edit Profile</h2>
      <div class="form">
        <img :src="profileImg" />
        <div class="profile">
          <div class="field">
            <label>Name</label>
            <input v-model="name" type="text" class="name" />
          </div>
          <div class="field">
            <label>Bio</label>
            <textarea v-model="bio" class="bio"></textarea>
          </div>
          <div class="field">
            <label>Profile Image URL</label>
            <input v-model="profileImg" type="text" class="profileImg" />
          </div>
          <div class="randomizePfp">
            <button type="button" @click="getRandomProfileImg">Randomize Profile Image</button>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button type="submit">Save</button>
        <button @click="emit('onSave')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.randomizePfp {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}
img {
  background-color: rgb(255, 255, 255);
  width: 175px;
  height: 175px;
  border-radius: 50%;
  margin-bottom: 50px;
  margin-right: 20px;
}
.form {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

input {
  width: 220px;
}
textarea {
  height: 100px;
  width: 220px;
}
h2 {
  text-align: center;
}
form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  border: 1px solid #000;
  background: radial-gradient(circle, rgba(250, 255, 254, 1) 0%, rgba(216, 246, 255, 1) 100%);
  border-radius: 1em;
}
label {
  width: 100px;
  text-align: right;
  margin-right: 10px;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1em;
  padding: 0;
  margin: 0;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 10px;
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
.field {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.container {
  margin-bottom: 50px;
}
</style>
