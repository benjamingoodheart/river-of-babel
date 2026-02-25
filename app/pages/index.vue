import { SunsetComponent } from '../../.nuxt/components';
<template>
  <UContainer class="w-sm md:w-md"  >
    <HeaderComponent/>
    <SunsetComponent/>
    <Suspense>
    <TranslatorComponent/>
    </Suspense>
    <FooterComponent/>
  </UContainer>
</template>
