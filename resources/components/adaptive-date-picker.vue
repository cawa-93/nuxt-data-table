<template>
<div>
	<template v-if="isMobile">
		<v-dialog
			persistent
			v-model="open"
			lazy
		>
			<v-text-field 
				slot="activator"
				:label="label"
				:value="scopedValue"
				prepend-icon="event"
				readonly
			></v-text-field>
			<v-date-picker v-model="scopedValue" scrollable actions :days="days" :months="months">
				<template scope="{ save, cancel }">
					<v-card-row actions>
						<v-btn flat primary @click.native="cancel()">Отменить</v-btn>
						<v-btn flat primary @click.native="save()">Сохранить</v-btn>
					</v-card-row>
				</template>
			</v-date-picker>
		</v-dialog>
	</template>

	<template v-else>
		<v-menu 
			lazy
			:close-on-content-click="false"
			v-model="open"
			transition="v-scale-transition"
			offset-y
			:nudge-left="56"
		>
			<v-text-field 
				slot="activator"
				:label="label"
				:value="scopedValue"
				prepend-icon="event"
				readonly
			></v-text-field>
			<v-date-picker v-model="scopedValue" no-title scrollable actions :days="days" :months="months">
				<template scope="{ save, cancel }">
					<v-card-row actions>
						<v-btn flat primary @click.native="cancel()">Отменить</v-btn>
						<v-btn flat primary @click.native="save()">Сохранить</v-btn>
					</v-card-row>
				</template>
			</v-date-picker>
		</v-menu>
	</template>
</div>
</template>

<script>
	export default {
		name: 'adaptive-date-picker',
		props: ['isMobile', 'value', 'label'],
		data () {
			return {
				open: false,
				days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Субота'],
				months: [
					'Январь',
					'Февраль',
					'Март',
					'Апрель',
					'Май',
					'Июнь',
					'Июль',
					'Август',
					'Сентябрь',
					'Октябрь',
					'Ноябрь',
					'Декабрь',
				],
			}
		},
		computed: {
			scopedValue: {
				get () { return this.value },
				set (value) { this.$emit('input', value) },
			},
		},
	}
</script>
