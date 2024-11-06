<template>
	<div class="relative isolate h-screen center p-4">
		<BG />
		<div class="auth-box">
			<h1 class="auth-title font-medium ">
				Share a Review
			</h1>
			<form class="auth-form" @submit.prevent="submitReview">
				<!-- Section 1: Rating and Review -->
				<div v-if="step===1" id="section-1" class="auth-form w-full">
					<div class="field">
						<label for="review">Review</label>
						<textarea
							id="review"
							v-model="spaceTestimonialData.review"
							placeholder="Write something nice"
							rows="4"
							class="input-textarea"
							autocomplete="off"
							required
						/>
					</div>
					<div class="field">
						<label for="rating">Rating</label>
						<Ratings
							id="rating"
							v-model="spaceTestimonialData.rating"
							class="input-field"
							name="rating"
						/>
					</div>
				</div>

				<!-- Section 2: Personal Information -->
				<div v-if="step === 2" id="section-2" class="auth-form w-full">
					<div class="field">
						<label for="name">Name</label>
						<input
							id="name"
							v-model="spaceTestimonialData.customer.name"
							placeholder="Enter your name"
							type="text"
							class="input-field"
							autocomplete="off"
							required
						>
					</div>
					<div class="field">
						<label for="email">Email</label>
						<input
							id="email"
							v-model="spaceTestimonialData.customer.email"
							placeholder="Enter your email"
							type="email"
							class="input-field"
							autocomplete="off"
							required
						>
					</div>
				</div>

				<button class="btn_flat w-full bg-dark text-light" :disabled="createLoading" type="submit">
					<span v-if="!createLoading" class="flex items-center gap-3">Submit</span>
					<Spinner v-else />
				</button>
			</form>
		</div>
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
		useRouter().push(`/review/${id}/thanks`)
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

