export default function ({ store, error }) {
  // If the user is not authenticated
	if (!store.state.currentUser || store.state.currentUser.role === 'user') {
		return error({ statusCode: 404, message: 'Page not found' })
	}
}
