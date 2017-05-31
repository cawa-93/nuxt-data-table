import Vue from 'vue'

const fbSdk = {
	install (Vue, options) {
		window.fbAsyncInit = function () {
			window.FB.init(options)
			Vue.prototype.FB = window.FB
		};
		(function (d, s, id) {
			/* eslint-disable one-var */
			var js, fjs = d.getElementsByTagName(s)[0]
			if (d.getElementById(id)) { return }
			js = d.createElement(s); js.id = id
			js.src = '//connect.facebook.net/en_US/sdk.js'
			fjs.parentNode.insertBefore(js, fjs)
		}(document, 'script', 'facebook-jssdk'))
	},
}
if (!process.SERVER_BUILD) {
	Vue.use(fbSdk, {
		xfbml: true,
		version: 'v2.9',
	})
}
