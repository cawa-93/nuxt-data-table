'use strict'

const User = use('App/Model/User')

class UsersController {
	// constructor () {}

	* index (request, response) {
		const users = yield User.query().withCount('pages').fetch()
		response.json(users)
	}

	* show (request, response) {
		const userId = request.param('id')
		const user = yield User.find(userId)

		if (user) {
			yield user.related('permissions', 'pages').load()
			response.json(user)
		} else {
			response.notFound()
		}
	}

	* update (request, response) {
		const userId = request.param('id')
		const user = yield User.find(userId)
		const updateParams = request.all()

		for (let field in user) {
			if (updateParams[field] !== undefined) {
				user[field] = updateParams[field]
			}
		}
		yield user.save()
		response.json(user)
	}

	* destroy (request, response) {
		try {
			let userId = request.param('id')
			const user = yield User.find(userId)
			yield user.delete()

			response.route('users.index')
		} catch (e) {
			response.status(500).send(e)
		}
	}
}

module.exports = UsersController
