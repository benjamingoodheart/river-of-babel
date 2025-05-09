
<script setup>
const store = useTokenStore()
const emit = defineEmits(['tokensStored'])
const {data} = await useFetch('/api/getJWT')
console.log(data.value)

const isExpired = computed(()=>{
    let now = Date.now()
    if(((now*1000)-(store.getLastFetched().value*1000))/10000  >= 3599){
        return true
    }
    if(store.getLastFetched().value == null){
        return true
    }
    return false
})

if(!isExpired){
    emit('tokensStored')
}
if(isExpired){
    const {status, data} = await useFetch('/api/getSpotifyToken')
    let cleanToken = String(data.value.access_token)
    store.setSpotifyToken(cleanToken)
    console.log(store.getSpotifyToken().value)
    store.setSpotifyLastFetched(Date.now())
    emit('tokensStored')

}

</script>
<template></template>