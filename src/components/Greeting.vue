<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Start Device
        </v-card-title>
        <v-card-text>
            Grab your device, begin playing any song, playlist, artist, or album on Spotify, and then click 'Start' to begin!'
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
           Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    data() {
        return {
            dialog: true,
        }
    },
}
</script>

<style>

</style>