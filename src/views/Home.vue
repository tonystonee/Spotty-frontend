<template>
  <div class="home">
    <h1>Spotify Power Hour</h1>

    <div>
      <v-btn large v-if="playing" @click="stop">STOP</v-btn>
      <v-btn large v-if="loggedIn && !playing" @click="start">start</v-btn>
      <v-btn large v-if="!loggedIn" @click="login">Connect your Spotify</v-btn>

      <p>{{count}}</p>

      <p v-if="status !== 200">{{ statusText }}</p>
    </div>
    <div>
      <h2>Status:</h2>
      <v-progress-linear v-if="playing" :value="percentage"></v-progress-linear>
      <p>{{this.playing ? 'Playing' : 'Not Playing'}}</p>
    </div>

    <greeting v-if="loggedIn"></greeting>
    <message :dialog="showMessage" @closeDialog="start"></message>

  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { mapGetters } from "vuex";
import Greeting from '../components/Greeting.vue';
import Message from '../components/Message.vue';


export default {
  name: "Home",
  created() {
    window.onbeforeunload = function (event) {
      this.handler(event);
    }
  },
  data() {
    return {
      count: 0,
      deviceStatus: false,
      host: process.env.VUE_APP_ROOT_API,
      seconds: process.env.SECONDS,
      status: 200,
      statusText: "",
      showMessage: false,
      playing: false,
      percentageTimer: null,
      timer: null,
      percentage: 0,
    };
  },
  components: {
    Greeting,
    Message,
  },
  computed: {
    ...mapGetters(["access_token", "refresh_token"]),
    loggedIn() {
      return !!this.access_token;
    },
  },
  methods: {
    async $_get_status() {
      let pkg;
      try {
        pkg = await axios.get(`${this.host}/player/?access_token=${this.access_token}`,   {
            crossDomain: true,
        });
      } catch (xhr) {
        console.log("$_get_status");
        console.error(xhr);

        return;
      }
      return pkg;
    },
    $_start: function () {
      const host = this.host;
      const access_token = this.access_token;
      const self = this;

      this.timer = setInterval(next, this.seconds * 1000);
      this.percentageTimer = setInterval(increasePerentage, 50);

      async function next() {
        if (self.count === process.env.CAP) {
          self.stop();
          return;
        }

        let pkg;
        try {
          pkg = await axios.get(`${host}/player/next?access_token=${access_token}`,   {
              crossDomain: true,
          });
        } catch (xhr) {
          console.log(xhr)
          this.playing = false;
          return;
        }
        self.status = pkg.status;
        self.count++;
        console.log('next: ', pkg);
      };

      function increasePerentage() {
        if (self.percentage >= 100) {
          self.percentage = 0;
        } else {
          self.percentage += 1;
        }
      }
    },
    async $_previous() {
      let pkg;
      try {
        pkg = await axios.get(`${this.host}/player/previous?access_token=${this.access_token}`,   {
            crossDomain: true,
        });
      } catch (xhr) {
        console.log("$_previous");
        console.error(xhr);

        this.showMessage = true;
        return;
      }
      this.count++;
      this.playing = true;
      return pkg;
    },
    login() {
      window.location.replace(`${this.host}/login`);
    },
    async start() {
      this.showMessage = false;

      const statusPkg = await this.$_get_status();
      const statusCode = statusPkg.data.status;

      // Device is not playing
      if (statusCode === 204) {
        this.showMessage = true;
      } else {
        // restart song
        const previousPkg = await this.$_previous();
        if ( previousPkg.status === 200 ) {
          this.$_start();
        }
      }

    },
    stop() {
      clearInterval(this.timer);
      clearInterval(this.percentageTimer);
      this.count = 0;
      this.playing = false;
      this.percentage = 0;
    },
  },
  mounted() {
    if (this.$route.query.access_token && this.$route.query.refresh_token) {
      this.$store.dispatch("set_refresh_token", this.$route.query.refresh_token);
      this.$store.dispatch("set_access_token", this.$route.query.access_token);
    }
  },
  beforeUnmount() {
    this.stop();
  },
};
</script>
