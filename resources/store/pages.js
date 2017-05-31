import axios from '~plugins/axios'

export const state = {
	items: [],
}

export const mutations = {
	SET_PAGES (state, pages) {
		state.items = pages
	},
	ADD_PAGE (state, page) {
		const index = state.items.findIndex(p => p.id === page.id)
		if (index >= 0) {
			state.items[index] = page
		} else {
			state.items.push(page)
		}
	},
	DELETE_PAGE (state, pageId) {
		const index = state.items.findIndex(p => p.id === pageId)
		if (index >= 0) {
			state.items.splice(index, 1)
		}
	},
}

export const actions = {
	async loadPages ({ commit, state, rootState }, { req }) {
		if (!rootState.currentUser) return false
		const { data } = await axios(req).get(`/api/v1/users/${rootState.currentUser.id}/pages.json`)
		commit('SET_PAGES', data)
	},

	async add ({ commit, state, rootState }, { req, url }) {
		const { data } = await axios(req).post(`/api/v1/users/${rootState.currentUser.id}/pages.json`, {url})
		if (!data.success) throw new Error('Не извесная ошибка')
		commit('ADD_PAGE', data.page)
	},

	async delete ({ commit, state, rootState }, { req, pageId }) {
		const { data } = await axios(req).delete(`/api/v1/users/${rootState.currentUser.id}/pages/${pageId}.json`)
		if (!data.success) throw new Error('Не извесная ошибка')
		commit('DELETE_PAGE', pageId)
	},
}
