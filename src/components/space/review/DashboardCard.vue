<template>
	<article v-if="data && !loading" class="flex flex-col md:flex-row p-4 gap-4 cursor-pointer text-dark border">
		<div class="flex flex-col gap-2  w-3/12">
			<Avatar v-if="!loading" :name="data.customer.name" bg="#D4C8FA" size="28" />
			<a href="#" class="text-dark text-lg font-bold ">{{ data.customer.name }}</a>
			<a href="#" class="text-dark italic">{{ data.customer.email }}</a>
		</div>


		<div class="flex flex-col items-start ">
			<Ratings v-model="data.rating" :name="data.id" size="20px" :disabled="true" />
			<div v-if="!loading" class="text-[15px] mt-2 " v-html="convertTextToHTMl(data.review)" />
			<span class="text-sm font-medium mt-2">{{ formatDate(data.created_at) }}</span>
		</div>
		<ColorBadge :name="statusChecker(data.public)" class="ml-auto self-start cursor-pointer" radius="6px" @click="updatePublicStatus(data, !data.public)" />
	</article>
</template>

<script setup lang="ts">
import { convertTextToHTMl, formatDate } from '@/composables/utils/formatter'
import { useUpdateSpaceTestimonial } from '@/composables/spaces/testimonials/edit'

const { updatePublicStatus } = useUpdateSpaceTestimonial()
const statusChecker = (status: string) => {
	if (!status) return 'unapproved'
	if (status) return 'approved'
	else return 'unapproved'
}
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

</style>q
