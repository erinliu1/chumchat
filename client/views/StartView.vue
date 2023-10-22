<template>
  <main>
    <div class="container">
      <div class="header">
        <img src="/public/logo.png" alt="ChumChat Logo" />
        <div class="text">
          <h1>Welcome to ChumChat</h1>
          <h2>A social media app for mindful journaling with friends :)</h2>
        </div>
      </div>
      <div class="buttons">
        <router-link to="/login">
          <button class="button_special">Log In</button>
        </router-link>
        <router-link to="/register">
          <button class="button_special">Register</button>
        </router-link>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  gap: 50px;
  height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.text {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

h1 {
  font-size: 5rem;
  margin: 0px;
}

h2 {
  font-size: 2rem;
  margin: 0px;
}
.buttons {
  display: flex;
  flex-direction: row;
  gap: 50px;
}

button {
  font-size: 2rem;
}

@media (max-width: 750px) {
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }
  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  button {
    font-size: 1.5rem;
  }
}

@media (max-width: 600px) {
  .buttons {
    gap: 10px;
  }
}

@media (max-width: 400px) {
  .buttons {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
