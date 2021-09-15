<template>
  <div class="home">
    <button @click="start">start</button>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapGetters(["access_token", "refresh_token"]),
  },
  mounted() {
    if (this.access_token && this.refresh_token) {
      console.log(this.access_token);
      console.log('refresh: ', this.refresh_token);
    } else if (this.$route.query.access_token && this.$route.query.refresh_token) {
      this.$store.dispatch("set_refresh_token", this.$route.query.refresh_token);
      this.$store.dispatch("set_access_token", this.$route.query.access_token);
    }
  },
};
</script>
