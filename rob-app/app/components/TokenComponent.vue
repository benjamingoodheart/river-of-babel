
<script setup>
const store = useTokenStore()
const emit = defineEmits(['tokensStored'])
// const {data} = await useFetch('/api/getJWT')
// console.log(data)
const {status, data} = await useFetch('/api/getSpotifyToken')
const isExpired = computed(()=>{
    if(store.getLastFetched().value == null){
        return true
    }
    let now = Date.now()
    console.log(store.getLastFetched())

    if(now-store.getLastFetched().value >= 3599){
        console.log(now-store.getLastFetched().value)
        return true
    }
    return false
})

if(status.value == "success" && isExpired){
    let cleanToken = String(data.value.access_token).replace("\r\n","")
    store.setToken(cleanToken)
    console.log(store.getToken().value)
    store.setLastFetched(Date.now())
    emit('tokensStored', data)

}

</script>
<template></template>