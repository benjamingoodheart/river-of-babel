<script setup lang="ts">
import {useLocalStorage} from '@vueuse/core'
// const {data} = await useFetch('/api/getJWT')
// console.log(data)
const {data} = await useFetch('/api/getSpotifyToken')
console.log(await data.value)
const localStore = useLocalStorage("spotifyToken", data.value)


</script>
<template>

</template>