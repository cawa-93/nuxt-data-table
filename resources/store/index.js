import * as MobileDetect from 'mobile-detect'

export const state = {
	currentUser: null,
	device: {},
}

export const mutations = {
	SET_USER: function (state, user) {
		state.currentUser = user
	},
	SET_DEVICE: function (state, userAgent) {
		const md = new MobileDetect(userAgent)
		state.device = {
			mobile: md.mobile(),
			tablet: md.tablet(),
			desktop: !md.mobile() && !md.tablet(),
		}
	},
}
