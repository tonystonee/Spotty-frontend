<template>
<v-card
elevation="2"
class="mt-10 pa-5 mx-10"
>
    <p v-for="i in instructions" :key="i" class="text-left">{{i}}</p>
    <p> App will play 60 songs for 60 seconds each</p>
</v-card>
</template>

<script>
export default {
name: "Instructions",
data() {
    return {
        instructions: [
            "1. Login with Spotify",
            "2. Begin playing any song, playlist, artist, or album on your device.",
            "3. Press start",
        ],
    }
}
}
</script>

<style>

</style>