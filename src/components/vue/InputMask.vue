<script setup>
import { vMaska } from "maska"
import {toast} from "vue-sonner";
</script>

<template>
  <div>
    <input v-maska data-maska="#-#">
    <hr>
    <button @click="toast('Hello!')">Show Toast</button>
  </div>
</template>