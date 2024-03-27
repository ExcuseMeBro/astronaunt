<template>
  <div
    id="countdown"
    class="absolute h-7 w-7 right-3 text-center bg-transparent rounded-full flex items-center justify-center"
  >
    <svg class="w-4 h-4 translate-y-px text-gray" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="black"/>
    </svg>
    <svg class="svg-circle">
      <circle r="18" cx="20" cy="20" />
    </svg>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

interface Props {
  isCancelled?: boolean
}

const props = defineProps<Props>()
interface Emits {
  (e: 'finished'): void
}

const timer = ref()

const number = ref(5)

const emit = defineEmits<Emits>()
setInterval(() => {
  if (number.value > 0) {
    number.value--
  }
}, 1000)

onMounted(() => {
  timer.value = setTimeout(() => {
    emit('finished')
  }, 5000)
})

watch(
  () => props.isCancelled,
  () => {
    clearTimeout(timer.value)
  }
)
</script>

<style scoped>
.svg-circle {
  position: absolute;
  top: -9px;
  right: -7px;
  width: 44px;
  height: 44px;
  transform: rotateY(-180deg) rotateZ(-90deg) scale(0.6);
}

.svg-circle circle {
  stroke-dasharray: 113px;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke-width: 3px;
  stroke: #eaeaea;
  fill: none;
  animation: countdown 5s linear forwards;
}

@keyframes countdown {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 113px;
  }
}
</style>
