<template>
  <v-app color="white">
    <v-main>
      <v-app-bar elevation="4">
        <v-toolbar-title><b>Spotify</b> Power Hour</v-toolbar-title>
      </v-app-bar>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer padless>
      <v-col class="text-center" cols="12">
        Discord:
        <a class="white--text" href="https://discord.gg/yrq9megq">https://discord.gg/yrq9megq</a>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: 'App',
  data() {
    return {
      host: process.env.VUE_APP_ROOT_API,
    };
  },
  methods: {
    async callBackend() {
      let pkg;
      try {
        pkg = await axios.get(`${this.host}/chicken`, {
          crossDomain: true,
        });
      } catch (xhr) {
        console.log("get backend");
        console.error(xhr);

        return;
      }
      return pkg;
    },
  },
  created() {
    this.callBackend();
    window.addEventListener('beforeunload', function (e) {
      // Cancel the event
      e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
      this.callBackend();
      // Chrome requires returnValue to be set
      e.returnValue = '';
    });
  },
};
</script>

<style>
html,
body {
  height: 100%;
  background: #101015;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-height: 100%;
}
</style>