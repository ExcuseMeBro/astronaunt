<script setup lang="ts">
import { vMaska } from "maska/vue";
import { toast } from "vue-sonner";

const props = withDefaults(
	defineProps<{
		buttonLabel?: string;
		toastMessage?: string;
	}>(),
	{
		buttonLabel: "Show toast",
		toastMessage: "Action completed successfully.",
	},
);
</script>

<template>
	<div class="flex flex-col gap-3 sm:flex-row">
		<input v-maska data-maska="#-#" placeholder="0-0" class="input input-bordered w-full max-w-xs" />
		<button type="button" class="btn btn-primary" @click="toast.success(props.toastMessage)">
			{{ props.buttonLabel }}
		</button>
	</div>
</template>
