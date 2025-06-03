<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}` : 'River ff Babel';
  }
})</script>
<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>