<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}` : 'River of Babel';
  }
})</script>
<template>
  <UApp :toaster="{position: 'bottom-center'}">
    <NuxtPage />
  </UApp>
</template>