'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.group('api', () => {
	Route.get('/page', function * (request, response) {
	})
	// Route.get('/menu', 'MenuController.index')

	// Route.get('/users/pages', 'PagesController.all')
	// Route.resource('users', 'UsersController').except(['create', 'edit', 'store'])

	// Route.resource('users.pages', 'PagesController').except(['create', 'edit'])
	// 	.addMember('posts')
})
// .middleware(['auth', 'access'])
.prefix('api/v1')
.formats(['json'], true)

Route.get('login/facebook', 'LoginController.redirect')
Route.get('login/facebook/authenticated', 'LoginController.handleCallback')
Route.get('logout', 'LoginController.logout')

Route.any('*', 'NuxtController.render')