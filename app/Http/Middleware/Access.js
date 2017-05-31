'use strict'

class Access {
	* handle (request, response, next) {
		// here goes your middleware logic
		// yield next to pass the request to next middleware or controller
		const user = request.currentUser
		if (user.role === 'user') {
			const params = request.params()
			const requestUserId = params.users_id || params.id
			if (user.id !== requestUserId) {
				response.notFound()
			}
		}
		yield next
	}
}

module.exports = Access
