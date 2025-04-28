<script setup lang="ts">
// const {data} = await useFetch('/api/getJWT')
// console.log(data)
const {data} = await useFetch('/api/getSpotifyToken')
console.log(await data.value)

</script>
<template>

</template>