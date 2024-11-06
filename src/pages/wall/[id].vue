<template>
	<div class="relative isolate min-h-screen  p-4">
		<!-- <BG /> -->

		<header class="flex flex-col items-center justify-center w-full border-2 border-dark rounded-lg pt-12 pb-16 md:pt-20 md:pb-24">
			<h1 class="sj-wol-title max-w-xl text-4xl font-semibold leading-normal tracking-tight md:text-5xl md:leading-normal text-center">
				Wall of Love
			</h1>
			<p class="sj-wol-subtitle max-w-lg whitespace-pre-line sm:text-lg opacity-90 text-center px-8 mt-3">
				See what our customers are saying about us
			</p>
			<nuxt-link :to="`/review/${id}`" target="_blank" class="btn btn-primary mt-6 text-dark">
				Write a testimonial
			</nuxt-link>
		</header>
		<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 container mb-5">
			<SpaceReviewWallCard v-for="review in (loading ? 3 : fetchedSpaceTestimonials)" :key="review" :data="loading ? {} : review" :loading="loading" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useFetchPublicSpaceTestimonials } from '@/composables/spaces/testimonials/fetch'


const step = ref(1)

const id = useRoute().params.id as string

const { loading, fetchedSpaceTestimonials, fetchPublicSpaceTestimonials, SpaceTestimonialsIsEmpty } = useFetchPublicSpaceTestimonials()

fetchPublicSpaceTestimonials(id)



definePageMeta({
	layout: 'public'
})



</script>

<style>
/* ... add custom styles to match the example ... */
</style>

