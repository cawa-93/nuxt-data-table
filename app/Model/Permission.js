'use strict'

const Lucid = use('Lucid')

class Permission extends Lucid {
	static get hidden () {
		return ['id']
	}
	static get createTimestamp () {
		return null
	}

	static get deleteTimestamp () {
		return null
	}

	static get updateTimestamp () {
		return null
	}

	users () {
		return this.belongsToMany('App/Model/User', 'user_permissions')
	}
}

module.exports = Permission
