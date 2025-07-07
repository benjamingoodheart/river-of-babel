<script setup>
import { useStorage } from '@vueuse/core'

const recentLinksStorage = useStorage('recent-links')
</script>
<template>
{{recentLinksStorage}}

</template>