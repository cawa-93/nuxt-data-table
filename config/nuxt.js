'use strict'

const resolve = require('path').resolve

module.exports = {
/*
** Headers of the page
*/
	head: {
		title: 'Adonuxt',
		meta: [
			{
				charset: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				hid: 'description',
				name: 'description',
				content: 'Adonuxt project',
			},
		],
		link: [
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
				type: 'text/css',
			},
			{
				rel: 'icon',
				type: 'image/x-icon',
				href: 'favicon.ico',
			},
		],
	},
/*
** Global CSS
*/
	css: [
		'vuetify/dist/vuetify.min.css',
		'~assets/css/main.css',
	],
/*
** Customize the progress-bar color
*/
	loading: '~components/loading.vue',
/*
** Point to resources
*/
	srcDir: resolve(__dirname, '..', 'resources'),
	plugins: ['~plugins/vuetify.js', '~plugins/fb-sdk.js'],
	build: {
		vendor: ['vuetify', 'axios'],
	},
}
