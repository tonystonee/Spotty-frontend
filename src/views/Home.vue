<template>
  <div class="home">
    <v-btn large v-if="!loggedIn" @click="login" color="purple">Login with Spotify</v-btn>

    <player v-else></player>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import Player from "@/components/Player.vue";
export default {
  name: "Home",
  computed: {
    ...mapGetters(["access_token", "refresh_token"]),
    loggedIn() {
      return !!this.access_token;
    },
  },
  components: {
    Player,
  },
  methods: {
    login() {
      window.location.replace(`${process.env.VUE_APP_ROOT_API}/login`);
    },
  },
  mounted() {
    if (this.$route.query.access_token && this.$route.query.refresh_token) {
      this.$store.dispatch("set_refresh_token", this.$route.query.refresh_token);
      this.$store.dispatch("set_access_token", this.$route.query.access_token);
    }
  },
};
</script>
