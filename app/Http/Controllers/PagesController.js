const URL = require('url')
const axios = require('axios')
const Env = use('Env')
const User = use('App/Model/User')
const Page = use('App/Model/Page')
const Post = use('App/Model/Post')
const Database = use('Database')

class PagesController {
	* all (request, response) {
		const pages = yield Page.query().withCount('users').withCount('posts').fetch()
		response.json(pages)
	}

	* index (request, response) {
		const userId = request.param('users_id') === 'current' ? request.currentUser.id : request.param('users_id')
		const pages = yield Page.query().whereHas('users', (builder) => {
			builder.where('id', userId)
		}).fetch()

		response.json(pages)
	}

	* show (request, response) {
		const pageId = request.param('id')
		const page = yield Page.query()
			.where('id', pageId)
			.whereHas('users', (builder) => {
				builder.where('id', request.param('users_id'))
			}).first()

		if (page) {
			yield page.related('posts').load()
			response.json(page)
		} else {
			response.notFound()
		}
	}

	* loadPage (pageUrl) {
		// const pageUrl = request.input('pageUrl')
		const pageId = URL.parse(pageUrl).pathname
		const accessToken = Env.get('FB_CLIENT_ID') + '|' + Env.get('FB_CLIENT_SECRET')
		const { data } = yield axios(`https://graph.facebook.com${pageId}?access_token=${accessToken}&fields=name,picture{url}`)
		return data
	}

	* store (request, response) {
		const userId = request.param('users_id')
		const user = yield User.find(userId)

		const page = yield this.loadPage(request.input('url'))

		page.picture = page.picture.data.url

		const insert = Database.table('pages').insert(page).toString()
		yield Database.schema.raw(insert + ' ON DUPLICATE KEY UPDATE name=VALUES(name), picture=VALUES(picture), update_at=CURRENT_TIMESTAMP')

		const attachedPages = yield user.pages().fetch()
		if (!attachedPages.find(p => p.id === page.id)) {
			yield user.pages().attach([page.id])
		}

		response.json({
			success: true,
			page
		})
	}

	* update (request, response) {
		const pageId = request.param('id')
		const page = yield Page.find(pageId)
		const updateParams = request.all()

		for (let field in page) {
			if (updateParams[field] !== undefined) {
				page[field] = updateParams[field]
			}
		}
		yield page.save()
		response.json(page)
	}

	* destroy (request, response) {
		const pageId = request.param('id')
		const userId = request.param('users_id')

		const user = yield User.find(userId)

		yield user.pages().detach([pageId])

		response.json({
			success: true,
		})
	}

	* posts (request, response) {
		const pageId = request.param('id')

		const posts = yield Post.query().whereHas('page', (builder) => {
			builder.where('id', pageId)
		}).fetch()

		response.json(posts)
	}
}

module.exports = PagesController
