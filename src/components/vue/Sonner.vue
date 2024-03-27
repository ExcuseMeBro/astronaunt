<script setup lang="ts">
import {toast} from "vue-sonner";
</script>

<template>
  <div class="space-x-3">
    <button @click="toast.info('Hello World!')" class="btn btn-info">Info</button>
    <button @click="toast.success('Hello World!')" class="btn btn-success">Success</button>
    <button @click="toast.warning('Hello World!')" class="btn btn-warning">Warning</button>
    <button @click="toast.error('Hello World!')" class="btn btn-error">Error</button>
  </div>
</template>

<style scoped>

</style>