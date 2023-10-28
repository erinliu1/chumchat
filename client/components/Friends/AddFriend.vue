<script setup lang="ts">
import FriendRequest from "@/components/Friends/FriendRequest.vue";
import Friend from "@/components/Friends/FriendComponent.vue";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const loaded = ref(false);
let sent_requests = ref([]);
let received_requests = ref([]);
let to_username = ref("");
const userStore = useUserStore();
const { currentUsername } = storeToRefs(userStore);
const send_error = ref("");
const send_message = ref("");
const error_or_message = ref("");
const friends = ref("");

async function getFriends() {
  let results;
  try {
    results = await fetchy(`api/friends`, "GET");
  } catch (_) {
    return;
  }
  friends.value = results;
}

async function getSentRequests() {
  let results;
  try {
    results = await fetchy(`api/friend/requests/sent`, "GET");
  } catch (_) {
    return;
  }
  sent_requests.value = results;
  to_username.value = "";
}

async function getReceivedRequests() {
  let results;
  try {
    results = await fetchy(`api/friend/requests/received`, "GET");
  } catch (_) {
    return;
  }
  received_requests.value = results;
}

async function sendFriendRequest() {
  let results;
  try {
    results = await fetchy(`api/friend/requests`, "POST", { body: { to: to_username.value } });
    send_message.value = results.msg;
    error_or_message.value = "message";
  } catch (e) {
    send_error.value = e instanceof Error ? e.message : "An error occurred";
    error_or_message.value = "error";
  }
  await getSentRequests();
}

onBeforeMount(async () => {
  await userStore.updateSession();
  await getFriends();
  await getSentRequests();
  await getReceivedRequests();
  loaded.value = true;
});
</script>

<template>
  <div class="container">
    <div class="sendRequestSection">
      <h1>Add a Chum</h1>
      <div class="sendRequest">
        <input v-model="to_username" placeholder="Enter username of your chum." />
        <div class="buttons">
          <button class="send" @click="sendFriendRequest">Send Chum Request</button>
        </div>
      </div>
      <div class="error_or_message">
        <div v-if="error_or_message === 'error'" class="error">{{ send_error }}</div>
        <div v-if="error_or_message === 'message'" class="message">{{ send_message }}</div>
      </div>
    </div>
    <div class="friendsSection">
      <h1>Your Chums</h1>
      <h3><i>Click on any of these profiles to view their entries!</i></h3>
      <hr />
      <div class="requestList">
        <section class="requests" v-if="loaded && friends.length !== 0">
          <div v-for="friend in friends" :key="friend">
            <Friend :friend="friend" @delete="getFriends" />
          </div>
        </section>
        <p v-else-if="loaded">No chums found.</p>
        <p v-else>Loading...</p>
      </div>
    </div>
    <div class="viewRequestSection" id="received">
      <h1>Received Chums Requests</h1>
      <h3><i>These are the pending chum requests that have been sent to you.</i></h3>
      <hr />
      <div class="requestList">
        <section class="requests" v-if="loaded && received_requests.length !== 0">
          <div v-for="request in received_requests" :key="request._id">
            <FriendRequest v-if="request.to === currentUsername" :request="request" :type="'received'" @refresh="getReceivedRequests" @accept="getFriends" />
          </div>
        </section>
        <p v-else-if="loaded">No requests found.</p>
        <p v-else>Loading...</p>
      </div>
    </div>
    <div class="viewRequestSection" id="sent">
      <h1>Sent Chum Requests</h1>
      <h3><i>These are the pending chum requests that you have sent.</i></h3>
      <hr />
      <div class="requestList">
        <section class="requests" v-if="loaded && sent_requests.length !== 0">
          <div v-for="request in sent_requests" :key="request._id">
            <FriendRequest v-if="request.from === currentUsername" :request="request" :type="'sent'" @refresh="getSentRequests" />
          </div>
        </section>
        <p v-else-if="loaded">No requests found.</p>
        <p v-else>Loading...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  text-align: center;
}
.requestList {
  width: 100%;
}
.requests {
  width: 100%;
}
h3 {
  margin: 0px;
  text-align: center;
}
h1 {
  margin: 0px;
  text-align: center;
}
.container {
  display: flex;
  flex-direction: column;
}
#sent {
  background: radial-gradient(circle, rgb(254, 250, 255) 0%, rgb(241, 225, 252) 100%);
}
#received {
  background: radial-gradient(circle, rgb(250, 255, 255) 0%, rgb(177, 241, 255) 100%);
}
.friendsSection {
  width: 100%;
  height: fit-content;
  border: 1px solid #000;
  border-radius: 1em;
  border: 1px solid black;
  padding-top: 10px;
  margin-top: 30px;
  background: radial-gradient(circle, rgb(240, 252, 242) 0%, rgb(193, 255, 195) 100%);
}
.viewRequestSection {
  width: 100%;
  height: fit-content;
  border: 1px solid #000;
  border-radius: 1em;
  border: 1px solid black;
  padding-top: 10px;
  margin-top: 30px;
}
.sendRequestSection {
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #000;
  background: radial-gradient(circle, rgb(255, 255, 250) 0%, rgb(247, 255, 193) 100%);
  border-radius: 1em;
  border: 1px solid black;
  padding-top: 10px;
}
.button {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border: 1px solid black;
}
button {
  height: fit-content;
}
.sendRequest {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
input {
  width: 260px;
  padding: 10px;
}
.cancel {
  background-color: transparent;
  border: 0px;
  margin: 0px;
  padding: 0px;
  width: fit-content;
}
.cancel:hover {
  color: black;
  text-decoration: underline;
}
.cancelButton {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
}
.send {
  max-width: 220px;
  width: fit-content;
  height: 50px;
  padding: 5px;
  margin-top: 10px;
}
hr {
  border: 1px solid rgb(196, 196, 196);
  margin: 10px;
}
.error {
  color: red;
}
.message {
  color: green;
}
.error_or_message {
  height: 30px;
}
</style>
