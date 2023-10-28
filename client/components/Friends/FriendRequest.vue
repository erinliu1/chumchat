<script setup lang="ts">
import { formatDate } from "../../utils/formatDate";
import { fetchy } from "../../utils/fetchy";
import { onBeforeMount, ref } from "vue";

const { request, type } = defineProps(["request", "type"]);
const emit = defineEmits(["refresh", "accept"]);
const loaded = ref(false);
let profile = ref({ profileImg: "", name: "", bio: "" });

async function removeFriendRequest() {
  try {
    await fetchy(`api/friend/requests/${request.to}`, "DELETE");
  } catch (_) {
    return;
  }
  emit("refresh");
}

async function acceptFriendRequest() {
  try {
    await fetchy(`api/friend/accept/${request.from}`, "PUT");
  } catch (_) {
    return;
  }
  emit("refresh");
  emit("accept");
}

async function rejectFriendRequest() {
  try {
    await fetchy(`api/friend/reject/${request.from}`, "PUT");
  } catch (_) {
    return;
  }
  emit("refresh");
}

async function getProfile(username: string) {
  let results;
  try {
    let query: Record<string, string> = { username };
    results = await fetchy("api/profiles", "GET", { query });
  } catch (_) {
    return;
  }
  profile.value = results;
}

onBeforeMount(async () => {
  if (type == "sent") {
    await getProfile(request.to);
  } else if (type == "received") {
    await getProfile(request.from);
  } else {
    throw new Error("type of request must be sent or received");
  }
  loaded.value = true;
});
</script>

<template>
  <div class="all">
    <div v-if="loaded && type == 'sent'" class="sent">
      <div class="button">
        <button @click="removeFriendRequest">Rescind Request</button>
      </div>
      <div class="requestContainer">
        <div class="request" id="sent">
          <p>
            <b>To @{{ request.to }}</b>
          </p>
          <img :src="profile.profileImg" class="pfp" />
        </div>
      </div>
      <div class="timestamp">
        <p>Sent on {{ formatDate(request.dateCreated) }}</p>
      </div>
    </div>
    <div v-else-if="loaded && type == 'received'" class="received">
      <div class="button">
        <div class="button">
          <button @click="acceptFriendRequest">Accept</button>
          <button @click="rejectFriendRequest">Reject</button>
        </div>
      </div>
      <div class="requestContainer">
        <div class="request" id="received">
          <p>
            <b>From @{{ request.from }}</b>
          </p>
          <img :src="profile.profileImg" class="pfp" />
        </div>
      </div>
      <div class="timestamp">
        <p>Received on {{ formatDate(request.dateCreated) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.requestContainer {
  display: flex;
  justify-content: center;
}
.sent {
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.received {
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.all {
  width: 100%;
  display: flex;
  justify-content: center;
}
#sent {
  background: radial-gradient(circle, rgba(255, 253, 250, 1) 0%, rgba(255, 246, 216, 1) 100%);
}
#received {
  background: radial-gradient(circle, rgba(255, 253, 250, 1) 0%, rgba(255, 246, 216, 1) 100%);
}
.request {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid #000;
  border-radius: 1em;
}
.timestamp {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  text-align: left;
  font-size: 0.9em;
  font-style: italic;
  margin-bottom: 5px;
}
p {
  margin: 0px;
  margin-bottom: 2px;
}
img {
  background-color: rgb(255, 255, 255);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid black;
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
.button {
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}
</style>
