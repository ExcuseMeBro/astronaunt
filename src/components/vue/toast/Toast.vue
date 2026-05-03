<template>
	<div class="toast-card relative flex items-center justify-between overflow-hidden rounded-xl bg-white p-4 dark:bg-slate-900">
		<span
			class="absolute left-0 top-1/2 h-7 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
			:class="accentClass"
		/>
		<div class="flex items-center gap-3 pr-8">
			<span class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-black dark:bg-slate-800">
				{{ icon }}
			</span>
			<h2 class="text-sm font-semibold leading-6 text-slate-950 dark:text-white">
				{{ title }}
			</h2>
		</div>
		<Timer />
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Timer from "./Timer.vue";

const props = withDefaults(
	defineProps<{
		type?: "success" | "error" | "warning";
		title?: string;
	}>(),
	{
		type: "success",
		title: "Saved successfully.",
	},
);

const icon = computed(() => ({ success: "✓", error: "!", warning: "!" })[props.type]);
const accentClass = computed(
	() =>
		({
			success: "bg-emerald-500",
			error: "bg-red-500",
			warning: "bg-amber-500",
		})[props.type],
);
</script>

<style scoped>
.toast-card {
	box-shadow: 0 8px 20px rgba(18, 28, 37, 0.16);
}
</style>
