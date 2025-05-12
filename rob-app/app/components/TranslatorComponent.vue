<script setup lang="ts">
import { useTokenStore } from '../stores/tokenStore';

const tokenStore = useTokenStore()
const firstLinkValue = ref('')
const translatedLink = ref('')
const originService = ref('')
const targetService = ref('')
const copied = ref(false)
const spotifyToken = ref()
const appleToken = ref()
const disabled = computed(() => {
    return originService.value == '' && targetService.value == '' ? true : false
})
const loaded = ref(false)

function determineService(link) {
    const appleRegex = /(\bappl\w+\b)/g;
    const spotifyRegex = /(\bspotif\w+\b)/;
    const str = link;

    if (str.search(appleRegex) != -1) {
        originService.value = "Apple"
        targetService.value = "Spotify"
    } else if (str.search(spotifyRegex) != -1) {
        originService.value = "Spotify"
        targetService.value = "Apple"
    } else {
        return -1
    }
}

function handleTokenLoad(event) {
    loaded.value = true
    appleToken.value = tokenStore.getAppleToken().value
    spotifyToken.value = tokenStore.getSpotifyToken().value
}

function copy() {
    navigator.clipboard.writeText(translatedLink.value)
    copied.value = true

    setTimeout(() => {
        copied.value = false
    }, 2000)
}

// Triggers the API 
async function parse() {
    if (targetService.value == "Spotify") {
        const { data } = await useFetch(`/api/parseAppleLink?uri=${firstLinkValue.value}&token=${appleToken.value}`)
    }
    if (targetService.value == "Apple") {
        const { data } = await useFetch(`/api/parseSpotifyLink?uri=spotify.com/album/6JbGZGta38AArBgflt024C&token=${spotifyToken.value}`)
        //parse
        const release = await data.value.release
        const title = await release._value.title
        const artists_array = await release._value.artists
        const artists_names = ref([])
        for (var a in artists_array) {
            let name = artists_array[a].name
            artists_names.value.push(name)
        }
        findRelease(artists_names.value[0], title)
    }

}

async function findRelease(artists, title) {
    const data = await $fetch(`/api/getSpotifyLink?artist=${artists}&title=${title}&token=${spotifyToken.value}`)
    translatedLink.value = await data.link

}
// Resets the button state on clear
watch(firstLinkValue, async (newLink, oldLink) => {
    if (newLink.length == 0) {
        originService.value = ''
        targetService.value = ''
    }
})

</script>
<template>
    <TokenComponent @tokensStored="handleTokenLoad" />
    <div class="flex flex-col items-center justify-center gap-4 mt-5" v-if="loaded == true">

        <UInput placeholder="Paste Your Link Here" v-model="firstLinkValue" :onchange="determineService(firstLinkValue)"
            size="xl" class="w-full" />
        <UButton :onclick="parse" color="neutral" variant="soft" v-if="disabled" :disabled="disabled">Convert Your
            Link</UButton>
        <UButton :onclick="parse" color="primary" variant="soft" v-if="!disabled" :disabled="disabled">Get
            {{ targetService }} Link</UButton>

        <UCard v-if="translatedLink != ''" class="w-full text-center">

            <UButton trailing="true" icon="material-symbols:content-copy-outline" :onclick="copy" v-if="!copied"
                variant="ghost" size="xs" class="my-auto"> {{ translatedLink }} </UButton>
            <UButton trailing="true" icon="material-symbols:content-copy" :onclick="copy" v-if="copied" variant="ghost">
                Copied! </UButton>
        </UCard>
    </div>
    <div class="flex flex-col items-center justify-center gap-4 mt-5" v-else>
        <USkeleton class="h-8 w-2/5"></USkeleton>
    </div>
</template>