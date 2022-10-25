<script setup lang="ts">
import Navbar from "~/components/navbar.vue";
const {
  public: { base },
} = useRuntimeConfig();
useHead({
  link: [
    {
      rel: "icon",
      href: `${base}favicon.ico`,
      type: "image/x-icon",
      id: "favicon",
    },
  ],
});
</script>

<template>
  <div class="h-screen">
    <Navbar />
    <slot />
  </div>
</template>

<style>
body {
  background: #ECE9D8;
  /* background-image: url("/BG.png"); */
  background-size: 100% 100%;
  font-size: 14px;
  color: #000000;
  margin: 0;
}
</style>
