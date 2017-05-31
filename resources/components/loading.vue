<template>
	<v-progress-linear v-if="loading" v-model="percent" :error="isFail"></v-progress-linear>
</template>

<script>
export default {
	data: () => ({
		loading: false,
		percent: 0,
		isFail: false,
	}),
	methods: {
		start () {
			this.percent = 0
			this.loading = true
		},
		finish () {
			this.percent = 100
			this.loading = false
		},
		fail () {
			this.isFail = true
		},
		increase (num) {
			this.percent += num
		},
	},
}
</script>

<style scoped>
	.progress-linear {
		z-index: 1000;
		position: absolute;
		margin: 0;
		top: 0;
	}
</style>
