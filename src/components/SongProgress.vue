<template>
    <v-progress-linear
      v-model="value"
      :buffer-value="bufferValue"
      color="green"
    ></v-progress-linear>
</template>

<script>
export default {
data () {
    return {
        value: 0,
        interval: 0,
    }
},

props: {
    seconds: {
        type: Number,
        default: 0,
    }
},

watch: {
    value (val) {
        if (val < 100) return

        this.value = 0
    },
},

mounted () {
    this.startBuffer()
},

beforeDestroy () {
    clearInterval(this.interval)
},

methods: {
    startBuffer () {
        clearInterval(this.interval)

        this.interval = setInterval(() => {
            this.value += 50/(this.seconds * 10);
        }, 50)
    },
},
}
</script>

<style>

</style>