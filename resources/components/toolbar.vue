<template>
	<v-toolbar fixed class="indigo darken-4">
		<v-toolbar-side-icon light @click.native.stop="emit()" />
		<v-toolbar-title>{{title}}</v-toolbar-title>
	</v-toolbar>
</template>

<script>
export default {
	name: 'header',
	props: ['title'],
	methods: {
		emit () {
			this.$emit('click-side-icon')
		},
	},
}
</script>

<style></style>
