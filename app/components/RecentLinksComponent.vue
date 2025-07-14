<script setup>
import { useStorage } from '@vueuse/core'

const recentLinksStorage = useStorage('recent-links')

const linkState = ref({"copied": false, "id": ''})


function copy(link) {
    navigator.clipboard.writeText(link.translatedLink)
    linkState.value.copied = true
    linkState.value.id = link.id
    

    setTimeout(() => {
        linkState.value.copied = false
        linkState.value.id = ''
    }, 2000)
}

function clear(){
    if(recentLinksStorage._rawValue){
        recentLinksStorage.value = null
    }
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
    <UButton label="Recent Links" size="xs" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-down" />
    <template #content>
      <UCard>
        <UButton @click="clear()">Clear</UButton>
        <div class="grid">
            <div class="row-span-12" v-for="(link,index) in recentLinksObj.links" :key="index"> 
                <!--Still need to figure out copying behavior-->
                <UButton variant="link" icon="material-symbols:content-copy-outline" @click="copy(link)" > <span v-if="!linkState.copied">{{link.artists[0]}} - {{link.release}} </span> </UButton>
            </div>
        </div>
      </UCard>
    </template>
</UPopover>


</template>