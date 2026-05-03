<script setup lang="ts">
import { toast } from "vue-sonner";

type ToastLabels = {
	info: string;
	success: string;
	warning: string;
	error: string;
	infoMessage: string;
	successMessage: string;
	warningMessage: string;
	errorMessage: string;
};

const props = withDefaults(
	defineProps<{
		labels?: ToastLabels;
	}>(),
	{
		labels: () => ({
			info: "Info",
			success: "Success",
			warning: "Warning",
			error: "Error",
			infoMessage: "Useful information is ready.",
			successMessage: "Saved successfully.",
			warningMessage: "Please check required fields.",
			errorMessage: "Something went wrong. Try again.",
		}),
	},
);
</script>

<template>
	<div class="flex flex-wrap gap-3">
		<button type="button" @click="toast.info(props.labels.infoMessage)" class="btn btn-info">
			{{ props.labels.info }}
		</button>
		<button type="button" @click="toast.success(props.labels.successMessage)" class="btn btn-success">
			{{ props.labels.success }}
		</button>
		<button type="button" @click="toast.warning(props.labels.warningMessage)" class="btn btn-warning">
			{{ props.labels.warning }}
		</button>
		<button type="button" @click="toast.error(props.labels.errorMessage)" class="btn btn-error">
			{{ props.labels.error }}
		</button>
	</div>
</template>
