const Database = use('Database')

class LoginController {
	* logout (request, response) {
		try {
			yield request.auth.logout()
			response.redirect('/login')
		} catch (e) {
			yield request.with({error: e.message}).flash()
			response.send({error: e.message})
		}
	}
	* redirect (request, response) {
		yield request.ally.driver('facebook').redirect()
	}

	* handleCallback (request, response) {
		/**
		 * @prop string id
		 * @prop string name
		 * @prop string email
		 * @prop string avatar
		 * @prop string nickname
		 * @prop string accessToken
		 * @prop null tokenSecret
		 * @prop int expires
		 */
		const fbUser = yield request.ally.driver('facebook').getUser()

		const newUser = {
			id: fbUser.getId(),
			avatar: fbUser.getAvatar(),
			name: fbUser.getName(),
		}

		const insert = Database.table('users').insert(newUser).toString()
		yield Database.schema.raw(insert + ' ON DUPLICATE KEY UPDATE name=VALUES(name), avatar=VALUES(avatar), last_login_at=CURRENT_TIMESTAMP')

		try {
			yield request.auth.loginViaId(newUser.id)
			response.redirect('/')
		} catch (e) {
			yield request.with({error: e.message}).flash()
			response.send({error: e.message})
		}
	}
}

module.exports = LoginController
