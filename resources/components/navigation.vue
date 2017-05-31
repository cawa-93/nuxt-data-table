<template>
	<v-navigation-drawer persistent disable-route-watcher light :value="value" @input="emit">
		<v-list class="pa-0">
			<v-list-item>
				<v-list-tile avatar tag="div">
					<v-list-tile-avatar>
						<img :src="user.avatar" />
					</v-list-tile-avatar>
					<v-list-tile-content>
						<v-list-tile-title>{{user.name}}</v-list-tile-title>
					</v-list-tile-content>
					<v-list-tile-action>
						<v-btn tag="a" icon href="/logout">
							<v-icon>exit_to_app</v-icon>
						</v-btn>
					</v-list-tile-action>
				</v-list-tile>
			</v-list-item>
		</v-list>

		<v-list class="pt-0">
			<v-divider></v-divider>
			<v-list-group no-action :value="true">
				<v-list-tile slot="item" avatar>
					<v-list-tile-content>
						<v-list-tile-title>Мои страницы</v-list-tile-title>
					</v-list-tile-content>
					<v-list-tile-action>
						<v-icon>keyboard_arrow_down</v-icon>
					</v-list-tile-action>
				</v-list-tile> 
				<v-list-item v-for="page in pages" :key="page.id">
					<v-list-tile router nuxt avatar :href="`/pages/${page.id}`">
						<v-list-tile-avatar>
							<img v-if="!!page.picture" :src="page.picture" />
						</v-list-tile-avatar>
						<v-list-tile-content>
							<v-list-tile-title>{{page.name}}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list-item>
				<v-list-item >
					<v-list-tile router nuxt to="/settings">
						<v-list-tile-action>
							<v-icon>settings</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>
								Управление страницами
							</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list-item>
			</v-list-group>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'navigation',
	props: ['value'],
	computed: {
		...mapState({
			pages: state => state.pages.items,
			user: state => state.currentUser,
		}),
	},
	methods: {
		emit (playload) {
			this.$emit('input', playload)
		},
	},
}
</script>
