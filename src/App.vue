<template>
  <n-config-provider :theme="darkTheme" height="100%">
    <n-layout>
      <router-view></router-view>
    </n-layout>
  </n-config-provider>
</template>

<script>
import { defineComponent, ref } from "vue";
import { NConfigProvider, NLayout } from "naive-ui";
import { darkTheme } from "naive-ui";

export default defineComponent({
  components: {
    NConfigProvider,
    NLayout,
  },
  setup() {
    return {
      darkTheme,
      theme: ref(null),
    };
  },
});
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