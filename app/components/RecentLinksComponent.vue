<script setup>
import { useStorage } from '@vueuse/core'

const recentLinksStorage = useStorage('recent-links')

const copied = ref(false)
function copy(link) {
    navigator.clipboard.writeText(link.translatedLink)
    copied.value = true

    setTimeout(() => {
        copied.value = false
    }, 2000)
}

const recentLinksObj = computed(()=> {
    if(recentLinksStorage._rawValue){
    return JSON.parse(recentLinksStorage._rawValue)}
    else{
        return {}
    }
})

watch(recentLinksStorage,()=>{
    console.log('changed')
})
</script>
<template>
<UPopover>
    <UButton label="Recent Links" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-up" />
    <template #content>
      <UCard>
        <div class="grid">
            <div class="row-span-12" v-for="link in recentLinksObj.links"> 
                <UButton variant="link" icon="material-symbols:content-copy-outline" @click="copy(link)"> <span v-if="!copied"> {{recentLinksObj.links[link]}} {{link.artists[0]}} - {{link.release}} </span> </UButton>
            </div>
        </div>
      </UCard>
    </template>
</UPopover>


</template>