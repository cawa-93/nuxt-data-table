'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
	static get deleteTimestamp () {
		return null
	}

	static get updateTimestamp () {
		return null
	}

	permissions () {
		return this.belongsToMany('App/Model/Permission', 'user_permissions')
	}

	pages () {
		return this.belongsToMany('App/Model/Page', 'user_pages')
	}
}

module.exports = User
