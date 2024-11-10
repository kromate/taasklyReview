<template>
	<div v-if="loading" class="flex w-full flex-col gap-4 p-5">
		<Skeleton v-for="i in 3" :key="i" class="w-full" height="100px" width="100%" radius="4px" />
	</div>
	<div v-if="!SpaceTestimonialsIsEmpty">
		<SpaceReviewDashboardCard v-for="review in (loading ? 3 : fetchedSpaceTestimonials)" :key="review" :data="loading ? {} : review" :loading="loading" />
	</div>
	<div v-else-if="!loading && SpaceTestimonialsIsEmpty">
		<div class="flex justify-center items-center h-[80dvh]">
			<p class="text-lg font-medium">
				No reviews found
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ExternalLink, Link, BrickWall } from 'lucide-vue-next'
import { usePageHeader } from '@/composables/utils/header'
import { useFetchSpaceTestimonials } from '@/composables/spaces/testimonials/fetch'
import { useCopyToClipboard } from '@/composables/utils/share'

const { loading, fetchedSpaceTestimonials, fetchSpaceTestimonials, SpaceTestimonialsIsEmpty } = useFetchSpaceTestimonials()

const id = useRoute().params.id as string

fetchSpaceTestimonials(id)




definePageMeta({
    layout: 'dashboard',
    middleware: ['is-authenticated', () => {
        usePageHeader().setPageHeader({
            title: 'Reviews',
            description: 'Manage your reviews',
            shouldShowFab: false,
			shouldShowTab: true,
			btnText: 'Actions',
			children: [
				{
					label: 'Preview Review Form',
					icon: ExternalLink,
					action: () => { window.open(`http://${location.host}/review/${useRoute().params.id}`, '_blank') }
				},
				{
					label: 'Copy link to Review form',
					icon: Link,
					action: () => { useCopyToClipboard().copyData({ info: `http://${location.host}/review/${useRoute().params.id}`, msg: 'Copied to clipboard' }) }
				},
				{
					label: 'Wall of Love',
					icon: BrickWall,
					action: () => { window.open(`http://${location.host}/wall/${useRoute().params.id}`, '_blank') }
				}
			]
        })
    }]
})
</script>

<style scoped></style>
