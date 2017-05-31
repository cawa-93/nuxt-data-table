<template>
<div>
	<div>
		<v-data-table
			:headers="headers"
			:items="page.posts"
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

	<div>
		<v-data-table
			:headers="headers"
			:items="page.posts"
			:pagination.sync="pagination"
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
</div>
</template>

<script>
import axios from '~plugins/axios'

export default {
	async asyncData ({error, req, route, store}) {
			const { data } = await axios(req).get(`/api/v1/page.json`)
			return {
				page: data,
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
			}
	},
}
</script>
