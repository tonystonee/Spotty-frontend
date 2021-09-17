<template>
  <div class="home">
    <button @click="start">start</button>

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
      status: 200,
      statusText: "",
    };
  },
  computed: {
    ...mapGetters(["access_token", "refresh_token"]),
  },
  methods: {
    async $_get_playback_state() {
      let pkg;
      try {
        pkg = await axios.get("http://spotty-env.eba-hiwn3fbm.us-east-1.elasticbeanstalk.com/player?access_token=" + this.access_token, {
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
