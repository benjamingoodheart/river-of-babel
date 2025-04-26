<script setup lang="ts">
const firstLinkValue = ref('')
const translatedLink = ref('')
const originService = ref('')
const targetService = ref('')
const copied = ref(false)

function determineService(link) {
  const appleRegex = /(\bappl\w+\b)/g;
  const spotifyRegex = /(\bspotif\w+\b)/;
  const str = link;

  if (str.search(appleRegex) != -1) {
    originService.value = "APPLE"
    targetService.value = "SPOTIFY"
  } else if (str.search(spotifyRegex) != -1) {
    originService.value = "SPOTIFY"
    targetService.value = "APPLE"
  } else {
    console.log(-1);
  }
}

function copy() {
  navigator.clipboard.writeText(translatedLink.value)
  copied.value = true

  setTimeout(() => {
    copied.value = false
  }, 2000)
}

async function convert() {
  const data = await $fetch('/api/getSpotifyLink')
  translatedLink.value = data.link
}


</script>
<template>
  <UContainer>
    <div class="flex flex-col items-center justify-center gap-4 h-screen">
      <h1 class="font-bold text-2xl text-(--ui-primary)">
        River of Babel
      </h1>
      <USeparator />
      <UInput placeholder="Paste Your Link Here" v-model="firstLinkValue"
        :onchange="determineService(firstLinkValue)" />
      <UCard class="text-xs"> Origin Service : {{ originService }}
        <br>
        Target Service: {{ targetService }}
      </UCard>
      <UButton :onclick="convert">Convert To Service Link</UButton>
      <UCard v-if="translatedLink != ''">
        {{ translatedLink }}
        <UButton icon="material-symbols:content-copy-outline" :onclick="copy" v-if="!copied" variant="ghost" />
        <UButton icon="material-symbols:content-copy" :onclick="copy" v-if="copied" variant="ghost" />
      </UCard>
    </div>
  </UContainer>
</template>
