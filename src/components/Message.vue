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
        <v-card-text>Please make suer your device is already playing.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="close"
          >
            Try Again
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    props: {
        dialog: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        close() {
            this.$emit('closeDialog');
        }
    }
}
</script>

<style>

</style>