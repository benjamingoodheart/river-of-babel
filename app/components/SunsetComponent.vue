<script setup>
const open = ref(true)
</script>
<template>
  <UModal v-model:open="open" title="River of Babel Will Be Sunsetting April 25th, 2026"close-icon="material-symbols:close-rounded">
    <template #body>
        <p class="pb-2">Spotify <NuxtLink to="https://developer.spotify.com/blog/2026-02-06-update-on-developer-access-and-platform-security" target="blank" class="text-emerald-200 hover:text-emerald-600">recently announced</NuxtLink> changes to their developer API, and the big thing is that you need a premium membership to develop using it. Considering their treatment of artists and platforming of ICE, this is unnacceptable to me, and I will therefore be abandoning River of Babel.  </p>
        <p class="pb-2" >This was a cool project and I am glad I got to flex my development muscles. I learned a bit on the way too. I am planning on doing a break down of some key components on <NuxtLink class="text-emerald-200 hover:text-emerald-600" to="https://watitdo.dev" target="blank">my blog </NuxtLink> over the next few months so check that out.</p>
        <p class="pb-2"> You can expect functionality to become unstable as soon as March 9th, and the website will cease to exist on April 26th.</p>
        <p class="pb-2">This was fun while it lasted.</p>
    </template>
  </UModal>
</template>