'use strict'

class MenuController {
	* index (request, response) {
		const user = request.currentUser
		const menu = {}

		menu.items = [
			{title: 'Добавить страницу', href: '/pages/add'},
			{nuxt: false, title: 'Logout', href: '/logout'},
		]

		if (user.role === 'administrator') {
			menu.items = menu.items.concat([
				{title: 'All Users', href: '/admin/users'},
				{title: 'All Pages', href: '/admin/pages'},
			])
		}

		response.json(menu)
	}
}

module.exports = MenuController
