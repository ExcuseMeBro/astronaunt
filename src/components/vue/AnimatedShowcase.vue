<script setup lang="ts">
import { animate, stagger } from "motion";
import { onMounted, ref } from "vue";

type AnimationCard = {
	title: string;
	body: string;
};

const props = withDefaults(
	defineProps<{
		ariaLabel?: string;
		cards?: AnimationCard[];
	}>(),
	{
		ariaLabel: "Animation showcase",
		cards: () => [
			{
				title: "Tiny runtime",
				body: "Motion loads only on this island.",
			},
			{
				title: "Progressive",
				body: "No JS fallback stays readable.",
			},
			{
				title: "Fast UI",
				body: "Good for page transitions and micro-interactions.",
			},
		],
	},
);

const root = ref<HTMLElement | null>(null);

onMounted(() => {
	if (!root.value) {
		return;
	}

	const controls = animate(
		root.value.querySelectorAll("[data-animate-card]"),
		{ opacity: [0, 1], transform: ["translateY(16px) scale(0.98)", "translateY(0) scale(1)"] },
		{ duration: 0.45, delay: stagger(0.08), easing: "ease-out" },
	);

	return () => controls.cancel();
});
</script>

<template>
	<div ref="root" class="grid gap-3 sm:grid-cols-3" :aria-label="props.ariaLabel">
		<div
			v-for="card in props.cards"
			:key="card.title"
			data-animate-card
			class="rounded-2xl border border-base-300 bg-base-100 p-4 opacity-0 shadow-sm"
		>
			<p class="text-sm font-bold">{{ card.title }}</p>
			<p class="mt-2 text-xs text-base-content/70">{{ card.body }}</p>
		</div>
	</div>
</template>
