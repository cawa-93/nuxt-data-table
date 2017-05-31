'use strict'

const Lucid = use('Lucid')

class Post extends Lucid {
	page () {
		return this.belongsTo('App/Model/Page')
	}
}

module.exports = Post
