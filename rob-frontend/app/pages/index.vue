import { USeparator, UContainer, UInput } from '../../.nuxt/components';
<script setup lang="ts">
const value = ref('')
function determine_service(link) {
  const apple_regex = /(\bappl\w+\b)/g;
  const spotify_regex = /(\bspotif\w+\b)/;
  const str = link;

  if (str.search(apple_regex) !=-1) {
    console.log("apple");
  } else if (str.search(spotify_regex) != -1) {
    console.log("spotify");
  } else {
    console.log(-1);
  }
}

function convert(){
  console.log("run convert process")
}
</script>
<template>
  <UContainer>
  <div class="flex flex-col items-center justify-center gap-4 h-screen">
    <h1 class="font-bold text-2xl text-(--ui-primary)">
      River of Babel
    </h1>
    <USeparator/>
    <UInput placeholder="Paste Your Link Here" v-model="value" :onchange="determine_service(value)" />
    <UButton :onclick="convert">Convert To Service Link</UButton>
    <UCard>
{{value}}
    </UCard>
  </div>
</UContainer>
</template>
