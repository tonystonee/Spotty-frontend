<template>
  <div class="home">
    <button v-if="loggedIn" @click="start">start</button>
    <button v-else @click="login ">Connect your Spotify</button>
    <p v-if="status !== 200">{{ statusText }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      // host: "http://spotty-env.eba-hiwn3fbm.us-east-1.elasticbeanstalk.com",
      host: "http://localhost:3000",
      status: 200,
      statusText: "",
    };
  },
  computed: {
    ...mapGetters(["access_token", "refresh_token"]),
    loggedIn() {
      return !!this.access_token;
    },
  },
  methods: {
    async $_get_playback_state() {
      let pkg;
      try {
        pkg = await axios.get(`${this.host}/player?access_token=${this.access_token}`,   {
            crossDomain: true,
        });
      } catch (xhr) {
        console.log('uh oh!')
        console.error(xhr);
        return;
      }
      this.status = pkg.status;
      this.statusText = pkg.statusText;
      console.log('adfd')
      console.log(pkg); 
    },
    login() {
      window.location.replace(`${this.host}/login`);
    },
    start() {
      this.$_get_playback_state();
    }
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
