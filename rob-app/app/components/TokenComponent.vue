<script setup lang="ts">
import {useLocalStorage} from '@vueuse/core'
// const {data} = await useFetch('/api/getJWT')
// console.log(data)
const {data} = await useFetch('/api/getSpotifyToken')

const localStore = useLocalStorage("spotify", {token: data.value.access_token, expiry: data.value.expires_in, retrieved: Date.now()})
console.log(localStore)
//figure out how to access the store??
</script>
<template>

</template>