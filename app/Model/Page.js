'use strict'

const Lucid = use('Lucid')

class Page extends Lucid {
	static get deleteTimestamp () {
		return null
	}

	users () {
		return this.belongsToMany('App/Model/User', 'user_pages')
	}

	posts () {
		return this.hasMany('App/Model/Post')
	}
}

module.exports = Page
