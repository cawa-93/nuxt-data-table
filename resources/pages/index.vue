<template>
	<div>

		<v-data-table
			:headers="headers"
			:items="page.posts"
			:rows-per-page-items="rowsPerPageItems"
			:pagination="pagination"
			class="elevation-1"
			>
			<template slot="items" scope="props">
				<td>{{ props.item.id }}	</td>
				<td>{{ props.item.created_time }}</td>
				<td>{{ props.item.type }}</td>

				<td	v-for="col in ['reactions', 'shares', 'comments']" :key="col">
					{{props.item[col]}}
				</td>
			</template>
		</v-data-table>

	</div>
</template>

<script>
import axios from '~plugins/axios'

export default {
	async asyncData ({error, req, route, store}) {
		try {

			const { data } = await axios(req).get(`/api/v1/page.json`)

			return {
				page: data,
				filters: {
					THRESHOLD: 10,
				},
				headers: [
					{text: 'ID', value: 'name', sortable: false},
					{text: 'Дата', value: 'created_time'},
					{text: 'Тип', value: 'type'},
					{text: 'Реак.', value: 'reactions'},
					{text: 'Подел.', value: 'shares'},
					{text: 'Коммент.', value: 'comments'},
				],
				pagination: {
					sortBy: 'created_time',
					descending: true,
				},
				rowsPerPageItems: [10, 20, 50, { text: 'Все', value: -1 }]
			}
		} catch (e) {
			error({ statusCode: 500, message: e.toString() })
		}
	},
}
</script>