<script setup lang="ts">
import { useTokenStore } from '../stores/tokenStore';
import { useStorage } from '@vueuse/core'

const toast = useToast()

const tokenStore = useTokenStore()

//link consts
const firstLinkValue = ref('')
const translatedLink = ref('')
const originService = ref('')
const targetService = ref('')

//tokens
const spotifyToken = ref()
const appleToken = ref()

//content states
const hasError = ref(null)
const copied = ref(false)
const disabled = computed(() => {
    return originService.value == '' && targetService.value == '' ? true : false
})
const loaded = ref(false)
const recentLinks = useStorage('recent-links', {links: {}})


//release consts
const releaseType = ref('')
const artists = ref([])
const releaseName = ref('')
const appleReleaseId = ref('')
const spotifyReleaseId = ref('')
const originMarket = ref('')
const targetMarket = ref('')

function determineService(link) {
    const appleRegex = /(\bappl\w+\b)/g;
    const spotifyRegex = /(\bspotif\w+\b)/;
    const str = link;

    if (str.search(appleRegex) != -1) {
        originService.value = "Apple Music"
        targetService.value = "Spotify"
    } else if (str.search(spotifyRegex) != -1) {
        originService.value = "Spotify"
        targetService.value = "Apple Music"
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

function showSearchToast() {
    toast.add({
        id: 'fetchConfirm',
        title: 'Fetching..',
        description: `Seaching ${targetService.value}....`,
        color: 'info',
        icon: 'material-symbols:search'
    })
}

function showErrorToast() {
    toast.add({
        title: `Error finding ${releaseName.value} on ${targetService.value}`,
        description: `We can't find that release on ${targetService.value}. Please make sure you have the correct URL and try again. Occasionally we won't be able to find the right match even if it exists on ${targetService.value}. We are actively working on this bug.`,
        color: 'error',
        duration: 15000,
        icon: 'material-symbols:error-circle-rounded-sharp',
    })
}

function showFoundToast() {
    toast.add({
        id: 'foundConfirm',
        title: `Successfully found ${releaseName.value}!`,
        color: 'success',
        description: `Good news! We found ${releaseName.value} by ${artists.value[0]} on ${targetService.value}`,
        icon: 'material-symbols:celebration-outline-rounded'
    })
}

function clearSearchToast() {
    toast.remove('fetchConfirm')
}

// Triggers the API 
async function parse() {
    showSearchToast()
    artists.value = []
    if (targetService.value == "Spotify") {
        const { data, status, error } = await useFetch(`/api/parseAppleLink?uri=${firstLinkValue.value}&token=${appleToken.value}`)

        if (status.value == "error") {
            hasError.value = true
        } else if (status.value == "success") {
            releaseName.value = await data.value.release._value.title
            const artistsArray = await data.value.release._value.artists
            let tempType = await data.value.release._value.type
            if (tempType === 'songs') {
                releaseType.value = "track"
            } else {
                releaseType.value = "album"
            }

            for (var a in artistsArray) {
                let name = artistsArray[a]
                artists.value.push(name)
            }
            findSpotifyRelease(artists.value[0], releaseName.value, releaseType.value)
        }

    }
    if (targetService.value == "Apple Music") {

        const { data, status } = await useFetch(`/api/parseSpotifyLink?uri=${firstLinkValue.value}&token=${spotifyToken.value}`)
        if (status.value == "error") {
            hasError.value = true
        }
        else if (status.value == "success") {
            const release = await data.value.release
            releaseName.value = await release._value.title
            let tempType = await release._value.type
            if (tempType === 'tracks') {
                releaseType.value = "songs"
            }
            const artistsArray = await release._value.artists
            for (var a in artistsArray) {
                let name = artistsArray[a].name
                artists.value.push(name)
            }
            findAppleRelease(artists.value[0], releaseName.value, releaseType.value)
        }

    }

    setTimeout(() => clearSearchToast(), 1000)

    setTimeout(() => {
        if (hasError.value == false) {
            showFoundToast()
        }
        if (hasError.value == true) {
            showErrorToast()
        }
    }, 500)

}

//TODO: Implement retrieveLink in the RecentLinksComponent.vue component
function storeLink(originLink,translatedLink){
    const id = self.crypto.randomUUID()
    const obj = { "origin": originLink, "translatedLink": translatedLink, "artists": artists.value, "release": releaseName.value }

    recentLinks.value.links[id]= obj
           

}

async function findSpotifyRelease(artistVal, title, type) {
    const data = await $fetch(`/api/getSpotifyLink?artist=${artistVal}&title=${title}&token=${spotifyToken.value}&releaseType=${type}`)
    translatedLink.value = await data.link
    
    if (await translatedLink.value == null) {
        translatedLink.value = ''
        hasError.value = true
    }
    //storeLink(firstLinkValue, translatedLink)
}   

async function findAppleRelease(artistVal, title, type) {
    const data = await $fetch(`/api/getAppleLink?artist=${artistVal}&title=${title}&token=${appleToken.value}&releaseType=${type}`)
    translatedLink.value = await data.link

    //storeLink(firstLinkValue, translatedLink)
}

// Resets the button state on clear
watch(firstLinkValue, async (newLink, oldLink) => {
    hasError.value = false
    originService.value = ''
    targetService.value = ''
    releaseName.value = ''
    artists.value = []
    translatedLink.value = ''
})

</script>
<template>
    <TokenComponent @tokensStored="handleTokenLoad" />
    <div class="flex flex-col items-center justify-center gap-4 mt-5" v-if="loaded == true">

        <UInput placeholder="Paste Your Link Here" v-model="firstLinkValue" :onchange="determineService(firstLinkValue)"
            size="xl" class="w-full" :class="{ 'focus-visible:ring-error': hasError }" ref="inputBox"
            @keyup.enter="parse" />

        <UTooltip text="Currently only supports Apple Music & Spotify.  Tidal compatibility coming soon!" :arrow="true">
            <UButton :onclick="parse" color="neutral" variant="soft" v-if="disabled" :disabled="disabled">Convert Your
                Link</UButton>
        </UTooltip>
        <UButton :onclick="parse" class="active:bg-primary-800" color="primary" variant="soft" v-if="!disabled"
            :disabled="disabled">Get
            {{ targetService }} Link</UButton>
        <UCard v-if="hasError" class="text-center shadow-xl">

            <h3 class="text-lg text-red-500"><b>Error!</b></h3>

            <p class="text-red-400 text-xs">If you have the correct URL, it may be that {{ targetService }} doesn't have
                a match. This happens from time to time, and we are working to figure out why this occurs.</p>
        </UCard>
        <UCard v-if="translatedLink != ''" class="w-full text-center">
            <template #header v-if="releaseName != ''">
                <h1 class="text-sm">{{ releaseName }} by <span v-for="(artist, index) in artists">{{ artist.trim() }}<span v-if="index+1<artists.length">, </span></span></h1>
            </template>
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