<template>
  <v-app color="white">
    <v-main>
      <v-app-bar
        elevation="4"
      >
        <v-toolbar-title>Spotify Power Hour</v-toolbar-title>
     </v-app-bar>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
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
}
</style>