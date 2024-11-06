<template>
	<div class="relative isolate h-screen center p-4">
		<BG />
		<header class="flex flex-col items-center justify-center md:w-1/2 max-w-4xl border-2 border-dark rounded-lg pt-12 pb-16 md:pt-20 md:pb-24">
			<h1 class="sj-wol-title max-w-xl text-3xl font-semibold leading-normal tracking-tight md:text-5xl md:leading-normal text-center">
				Thanks for your review
			</h1>
			<p class="sj-wol-subtitle max-w-lg whitespace-pre-line sm:text-lg opacity-90 text-center px-8 mt-3">
				Your review has been submitted successfully
			</p>
			<nuxt-link :to="`/wall/${id}`" target="_blank" class="btn btn-primary mt-6 text-dark">
				View Wall of Love
			</nuxt-link>
		</header>
	</div>
</template>

<script setup lang="ts">

import { useAlert } from '@/composables/core/notification'
import { useFetchSpaceById } from '@/composables/spaces/id'
import { useCreateSpaceTestimonial } from '@/composables/spaces/testimonials/create'
import { setCustomHead } from '@/composables/core/head'


const step = ref(1)

const id = useRoute().params.id as string

const { space, loading: spaceLoading, fetchSpaceById } = useFetchSpaceById()
const { loading: createLoading, createSpaceTestimonial, spaceTestimonialData } = useCreateSpaceTestimonial()

fetchSpaceById(id)



const submitReview = async () => {
	if (spaceTestimonialData.value.rating === 0) useAlert().openAlert({ type: 'ERROR', msg: 'The rating is required' })
	if (step.value === 1) {
		step.value = 2
	} else if (space.value) {
		await createSpaceTestimonial(space.value.id)
		useAlert().openAlert({ type: 'SUCCESS', msg: 'Review submitted successfully', addrs: 'submitReview' })
	}
}


definePageMeta({
	layout: 'public'
})


watch(space, () => {
	if (space.value?.title) {
		setCustomHead({
			title: `Share a Review | ${space.value?.name}`,
			desc: `Share a Review for ${space.value?.name}`,
			img: space.value?.logo
		})
	}
}, { immediate: true })



</script>

