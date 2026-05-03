<template>
	<div class="absolute right-3 flex h-7 w-7 items-center justify-center rounded-full bg-transparent text-center">
		<span class="text-xs font-bold text-slate-500" aria-hidden="true">×</span>
		<svg class="svg-circle" aria-hidden="true">
			<circle r="18" cx="20" cy="20" />
		</svg>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";

interface Props {
	isCancelled?: boolean;
}

type Emits = (event: "finished") => void;

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const timeoutId = ref<ReturnType<typeof setTimeout> | null>(null);
const intervalId = ref<ReturnType<typeof setInterval> | null>(null);
const secondsLeft = ref(5);

function clearTimers() {
	if (timeoutId.value) {
		clearTimeout(timeoutId.value);
		timeoutId.value = null;
	}

	if (intervalId.value) {
		clearInterval(intervalId.value);
		intervalId.value = null;
	}
}

onMounted(() => {
	intervalId.value = setInterval(() => {
		secondsLeft.value = Math.max(0, secondsLeft.value - 1);
	}, 1000);
	timeoutId.value = setTimeout(() => {
		emit("finished");
		clearTimers();
	}, 5000);
});

onUnmounted(clearTimers);

watch(
	() => props.isCancelled,
	(isCancelled) => {
		if (isCancelled) {
			clearTimers();
		}
	},
);
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
	stroke: #e5e7eb;
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
