'use strict'

const Env = use('Env')
const Config = use('Config')
const Nuxt = require('nuxt')

class NuxtController {
	constructor () {
		let config = Config.get('nuxt')
		config.dev = Env.get('NODE_ENV') === 'development'
		this.nuxt = new Nuxt(config)
		if (Env.get('NODE_ENV') === 'development') {
			this.nuxt.build()
		}
	}

	* render (request, response) {
		// request.request.auth = request.auth
		request.request.session = yield request.session.all()
		request.request.currentUser = request.currentUser
		this.nuxt.render(request.request, response.response)
	}
}

module.exports = new NuxtController()
