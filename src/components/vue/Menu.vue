<script setup lang="ts">
import { onMounted, ref } from "vue";

type MenuLabels = {
	home: string;
	demo: string;
	docs: string;
	search: string;
	notifications: string;
};

type ThemeLabels = {
	light: string;
	dark: string;
};

const props = withDefaults(
	defineProps<{
		brand?: string;
		labels?: MenuLabels;
		themeLabels?: ThemeLabels;
		homeHref?: string;
		demoHref?: string;
		docsHref?: string;
	}>(),
	{
		brand: "Astronaunt",
		labels: () => ({
			home: "Home",
			demo: "Demo",
			docs: "Docs",
			search: "Search",
			notifications: "Notifications",
		}),
		themeLabels: () => ({
			light: "Light",
			dark: "Dark",
		}),
		homeHref: "/",
		demoHref: "/demo",
		docsHref: "https://docs.astro.build/",
	},
);

const theme = ref<"light" | "dark">("light");

function setTheme(nextTheme: "light" | "dark") {
	theme.value = nextTheme;
	document.documentElement.setAttribute("data-theme", nextTheme);
}

function changeTheme() {
	setTheme(theme.value === "dark" ? "light" : "dark");
}

onMounted(() => {
	setTheme((document.documentElement.dataset.theme as "light" | "dark") || "light");
});
</script>

<template>
	<nav class="navbar border-b border-base-300 bg-base-100/90 px-6 backdrop-blur">
		<div class="navbar-start">
			<div class="dropdown">
				<label tabindex="0" class="btn btn-ghost btn-circle" :aria-label="props.labels.demo">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
					</svg>
				</label>
				<ul tabindex="0" class="menu dropdown-content z-10 mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
					<li><a :href="props.homeHref">{{ props.labels.home }}</a></li>
					<li><a :href="props.demoHref">{{ props.labels.demo }}</a></li>
					<li><a :href="props.docsHref">{{ props.labels.docs }}</a></li>
				</ul>
			</div>
		</div>
		<div class="navbar-center">
			<a :href="props.homeHref" class="btn btn-ghost text-xl font-black normal-case">{{ props.brand }}</a>
		</div>
		<div class="navbar-end gap-1">
			<button class="btn btn-ghost btn-circle" type="button" :aria-label="props.labels.search">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</button>
			<button class="btn btn-ghost btn-circle" type="button" :aria-label="props.labels.notifications">
				<div class="indicator">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
					</svg>
					<span class="badge badge-primary badge-xs indicator-item"></span>
				</div>
			</button>
			<button class="btn btn-ghost" type="button" @click="changeTheme">
				{{ theme === "dark" ? props.themeLabels.light : props.themeLabels.dark }}
			</button>
		</div>
	</nav>
</template>
