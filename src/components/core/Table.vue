<template>
	<div class="w-full sm:border border-dark rounded-lg overflow-x-hidden text-dark">
		<slot name="option" />
		<div class="overflow-x-auto">
			<table v-if="loading || displayTable.length > 0" class="w-full table">
				<thead class="px-4">
					<tr class="h-[52px] border-b px-4">
						<th v-if="checkbox" class="pl-4 text-light">
							<input type="checkbox" @change="toggleSelectAll" :checked="isAllSelected">
						</th>
						<th v-if="hasIndex" class="pl-4 text-dark text-xs">
							S/N
						</th>
							<th v-for="(header, i) in (headers as Record<string, any>)" :key="i" class="uppercase text-sm  font-bold text-left px-4" :class="[headerClass ? headerClass : 'bg-dark text-light']" :style="`width: ${header.width ? header.width : defaultColWidth}%;`">
							{{ header.text }}
						</th>
					</tr>
				</thead>

				<div />
				<tbody v-if="!loading">
					<tr v-for="(data, index) in displayTable" :key="index" :data-index="index" :class="['border-t border-gray50 py-8 font-normal text-sm h-[52px]', hasOptions ? 'cursor-pointer' : '']" @click="hasOptions && option(data)">
						<td v-if="checkbox" class="px-4">
							<input type="checkbox" :value="data" v-model="selectedItems">
						</td>
						<td v-for="(value, key) in populateTable(data)" :key="key" class="px-4">
							<slot name="item" :item="{ [key]: value, data }">
								{{ value }}
							</slot>
						</td>
					</tr>
				</tbody>
				<tbody v-else>
					<tr v-for="n in 3" :key="n" class="border-t border-gray50 py-8 font-normal  text-sm h-[52px]">
						<td v-for="(header, i) in headers" :key="i" class="px-4">
							<Skeleton height="15px" radius="3px" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div v-if="displayTable.length === 0 && !loading" class="min-h-[250px] flex items-center justify-center">
			<slot name="empty" />
		</div>
	</div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import dot from '@/assets/icons/src/dot.vue'

const props = defineProps({
	option: {
		type: Function,
		default: () => { }
	},
	hasOptions: {
		type: Boolean,
		default: false
	},
	headers: {
		type: Array as PropType<Record<string, any>[]>,
		default: () => [],
		required: true
	},
	headerClass: {
		type: String,
		default: '',
		required: false
	},
	tableData: {
		type: Array,
		default: () => []
	},
	tableHeight: {
		type: Number,
		default: 200
	},
	loading: {
		type: Boolean,
		default: true
	},
	checkbox: {
		type: Boolean,
		default: false
	},
	hasIndex: {
		type: Boolean,
		default: false
	},
	pageSync: {
		type: String,
		default: ''
	},
	itemPerPage: {
		type: Number,
		default: 10
	},
	page: {
		type: String,
		default: ''
	}
})

const itemLength = ref(0)
const checked = ref([])
const pages = ref(0)

const displayTable = computed(() =>
	props.pageSync ? paginate(props.tableData) : props.tableData
)

const getItemsWithColWidth = computed({
	get: () => {
		let length = 0
		props.headers.forEach((item: any) => {
			if (!item.width) {
				length++
			}
		})
		return length
	},
	set: () => { }
})

const defaultColWidth = computed(() =>
	roundToTwo(100 / props.headers.filter(item => !item.width).length)
)

const roundToTwo = (num) => {
	return +(Math.round(parseFloat(num + 'e+2')) + 'e-2')
}
const paginate = (data) => {
	const page: any = props.page
	const perPage: any = props.itemPerPage
	const from = page * perPage - perPage
	const to = page * perPage
	return data.slice(from, to)
}

function populateTable(data: Record<string, any>) {
	return props.headers.reduce((obj, item) => {
		if (data[item.value] !== undefined) {
			obj[item.value] = data[item.value];
		}
		return obj;
	}, {} as Record<string, any>);
}

const selectedItems = ref([])
const isAllSelected = computed(() => selectedItems.value.length === displayTable.value.length)

const toggleSelectAll = () => {
	if (isAllSelected.value) {
		selectedItems.value = []
	} else {
		selectedItems.value = [...displayTable.value]
	}
}

const beforeEnter = (el) => {
	el.style.opacity = 0
	// el.style.transform = 'translateY(100px)'
}
const enter = (el, done) => {
	gsap.to(el, {
		opacity: 1,
		// y: 0,
		duration: 0.5,
		onComplete: done,
		delay: el.dataset.index * 0.1
	})
}

defineExpose({
	selectedItems
})

</script>

<style scoped lang="scss">
.orderupList-enter-from,
.orderupList-leave-to {
	opacity: 0;
	transform: translateY(30px);
}

.orderupList-enter-active,
.orderupList-leave-active {
	transition: all 0.5s;
}
</style>
