<script setup>
import { useStorage } from '@vueuse/core'

const recentLinksStorage = useStorage('recent-links')

const currentIndex = ref('')

function copy(link, index) {
    navigator.clipboard.writeText(link.translatedLink)
    
    currentIndex.value = index
    setTimeout(() => {
        currentIndex.value = ''
    }, 2000)
}

function clear(){
    recentLinksStorage.value = null
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
    <UButton label="Recent Links" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-up"/>
    <template #content>
      <UCard>
        <div class="grid">
            <div class="grid grid-cols-3">
                <div class="col-span-2"></div>
                <div class="col-span-1"> <UButton size="sm" variant="outline" color="info" @click="clear" >Clear</UButton></div>
            </div>
            <div class="row-span-12" v-for="(link,index) in recentLinksObj.links"> 
                <UButton variant="link" class="transition-discrete" icon="material-symbols:content-copy-outline" @click="copy(link,index)" v-if="index!=currentIndex"> <span > {{recentLinksObj.links[link]}} {{link.artists[0]}} - {{link.release}} </span> </UButton>
                <UButton variant="link"  class="transition-discrete" v-else disabled icon="material-symbols:check-small-rounded">Copied! </UButton>
            </div>
        </div>
      </UCard>
    </template>
</UPopover>


</template>