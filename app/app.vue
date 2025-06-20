<script setup>
defineOgImageComponent('NuxtSeo', {
  colorMode: 'dark'
})
useSeoMeta({
  ogImage: '/og_image.png',
  twitterTitle: 'River of Babel',
  twitterDescription: 'Translate links between Apple Music and Spotify!',
  twitterImage: '/og_image.png'
})

useHead({

})
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}` : 'River of Babel';
  },
  link: [
    {
      rel: 'icon',
      type: 'image/ico',
      href: '/favicon.ico'
    }
  ]
})</script>
<template>
  <UApp :toaster="{position: 'bottom-center'}">
    <NuxtPage />
  </UApp>
</template>