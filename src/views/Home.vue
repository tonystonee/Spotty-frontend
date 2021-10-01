<template>
  <div class="home">
    <n-space justify="center" vertical>
      <n-button size="large" v-if="playing" @click="stop">STOP</n-button>
      <n-button size="large" v-if="loggedIn" @click="start">start</n-button>
      <n-button size="large" v-else @click="login">Connect your Spotify</n-button>
      <p>{{count}}</p>

      <p v-if="status !== 200">{{ statusText }}</p>
  </n-space>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { mapGetters } from "vuex";
import { NButton, NSpace } from "naive-ui";

export default {
  name: "Home",

  components: {
    NButton,
    NSpace,
  },
  created() {
    window.onbeforeunload = function (event) {
      this.handler(event);
    }
  },
  data() {
    return {
      // host: "http://spotty-env.eba-hiwn3fbm.us-east-1.elasticbeanstalk.com",
      count: 0,
      host: "http://localhost:3000",
      seconds: 5,
      status: 200,
      statusText: "",
      playing: false,
      timer: null,
    };
  },
  computed: {
    ...mapGetters(["access_token", "refresh_token"]),
    loggedIn() {
      return !!this.access_token;
    },
  },
  methods: {
    $_next: function () {
      const host = this.host;
      const access_token = this.access_token;
      const self = this;
      async function next() {
        let pkg;
        try {  
          pkg = await axios.get(`${host}/player/next?access_token=${access_token}`,   {
              crossDomain: true,
          });
        } catch (xhr) {
          console.log('uh oh!')
          console.error(xhr);
          return;
        }
        this.status = pkg.status;
        this.statusText = pkg.statusText;
        self.count++;
        console.log(pkg);
      };

      if (self.count === 2) {
        clearInterval(this.timer);
      } else {
        this.timer = setInterval(next, this.seconds * 1000);
      }
    },
    async $_previous() {
      let pkg;
      try {
        pkg = await axios.get(`${this.host}/player/previous?access_token=${this.access_token}`,   {
            crossDomain: true,
        });
      } catch (xhr) {
        console.log('uh oh!')
        console.error(xhr);
        return;
      }
      this.status = pkg.status;
      this.statusText = pkg.statusText;
      console.log(pkg);
    },
    login() {
      window.location.replace(`${this.host}/login`);
    },
    start() {
      this.$_previous();
      this.$_next();
      this.playing = true;
    },
    stop() {
      clearInterval(this.timer);
    },
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
  beforeUnmount() {
    this.$_stop_player();
  },
};
</script>
