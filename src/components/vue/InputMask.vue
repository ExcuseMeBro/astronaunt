<script setup>
import { vMaska } from "maska"
import {toast} from "vue-sonner";
</script>

<template>
  <div>
    <input v-maska data-maska="#-#" placeholder="0-0" class="input input-bordered w-full max-w-xs">
    <button @click="toast('Hello!')">Show Toast</button>
  </div>
</template>