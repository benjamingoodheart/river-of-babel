<script setup>
import { useStorage } from '@vueuse/core'

const recentLinksStorage = ref(useStorage('recent-links'))
const recentJSON = ref(null)
if(recentLinksStorage.value != null){
    recentJSON.value = JSON.parse(JSON.stringify(recentLinksStorage.value))
}





</script>
<template>

{{recentJSON}}



</template>