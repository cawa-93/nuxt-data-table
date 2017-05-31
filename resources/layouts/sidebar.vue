<template>
	<v-app>
		<app-navigation v-model="sidebar"></app-navigation>
		<app-toolbar :title="title" @click-side-icon="toggleSidebar"></app-toolbar>
		<main>
			<v-container fluid>
				<nuxt/>
			</v-container>
		</main>
	</v-app>
</template>

<script>
import appToolbar from '~components/toolbar'
import appNavigation from '~components/navigation'

export default {
	middleware: ['auth'],
	components: {
		appToolbar, appNavigation,
	},
	data () {
		return {
			sidebar: true,
			title: 'Title',
		}
	},
	methods: {
		toggleSidebar (payload) {
			this.sidebar = !this.sidebar
		},
	},

}
</script>

<style></style>
