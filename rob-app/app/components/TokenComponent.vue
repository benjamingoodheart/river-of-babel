<script setup>
const store = useTokenStore()
const emit = defineEmits(['tokensStored'])
const appleTokenStored = ref(false)
const spotifyTokenStored = ref(false)

async function handleAppleTokens() {
    const { data } = await useFetch('/api/getJWT')
    store.setAppleToken(data.value)
    //TODO: if expired refetch
    appleTokenStored.value = true
}

async function handleSpotifyTokens() {
    const isExpired = computed(() => {
        let now = Date.now()
        if (((now * 1000) - (store.getLastFetched().value * 1000)) / 10000 >= 3599) {
            return true
        }
        if (store.getLastFetched().value == null) {
            return true
        }
        return false
    })

    if (!isExpired) {
        emit('tokensStored')
    }
    if (isExpired) {
        const { status, data } = await useFetch('/api/getSpotifyToken')
        let cleanToken = String(data.value.access_token)
        store.setSpotifyToken(cleanToken)
        store.setSpotifyLastFetched(Date.now())
        spotifyTokenStored.value = true
    }
}

watch(() => appleTokenStored.value === true && spotifyTokenStored.value === true, () => { emit('tokensStored') })

await handleSpotifyTokens()
await handleAppleTokens()

</script>
<template></template>