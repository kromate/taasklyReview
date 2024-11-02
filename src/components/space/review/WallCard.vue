<template>
	<article v-if="data && !loading" class="border p-4 border-dark rounded-md flex flex-col gap-4">
		<div class="flex w-full justify-between items-center">
			<span class="flex justify-between gap-1 text-sm">

				<Ratings v-model="data.rating" :name="data.id" size="20px" :disabled="true" />
			</span>
			<span class="text-sm font-medium ml-auto">{{ formatDate(data.created_at) }}</span>
		</div>

		<p class="text-base" v-html="convertTextToHTMl(data.review)" />

		<footer class="flex gap-4 items-center mt-auto">
			<div class="flex-shrink-0 ">
				<Avatar v-if="!loading" :name="data.customer.name" size="28" />
				<Skeleton v-else height="36px" width="36px" radius="100%" />
			</div>
			<a href="#" class="text-dark">{{ data?.customer?.name }}</a>
		</footer>
	</article>
</template>

<script setup lang="ts">
import { convertTextToHTMl, formatDate } from '@/composables/utils/formatter'
const props = defineProps({
	data: {
		type: Object,
		required: true
	},
	loading: {
		type: Boolean,
		required: true
}
})
</script>

<style scoped>

</style>
