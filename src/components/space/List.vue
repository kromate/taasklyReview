<template>
	<div class="container">
		<div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 py-1 gap-4">
			<article v-for="space in spaces" :key="space.id" class="bg-white relative rounded-md shadow-md hover:btn_shadow border border-dark">
				<a :href="`/spaces/${space.id}`" class="text-center px-2 h-40 flex items-center justify-center rounded-t-lg bg-cover bg-center bg-no-repeat" :style="{ backgroundColor: space.backgroundColor, color: space.textColor, backgroundImage: `url('${space.backgroundImage}')` }">
					<h1 class="text-2xl font-light px-2 line-clamp-4">{{ space.title || 'Untitled Space' }}</h1>
				</a>
				<div class="p-4 border-t border-gray-200 flex items-center justify-between">
					<div>
						<div class="text-gray-500 items-center  cursor-default inline-block text-xs ">
							<a v-if="space.reviews_count > 0" :href="`/spaces/${space.id}/submissions`">
								{{ space.reviews_count }} {{ space.reviews_count === 1 ? 'review' : 'reviews' }}
							</a>
							<span v-else>
								No reviews
							</span>
						</div>
					</div>
					<IconDropdown :children="dropdownChildren()" :data="space" />
				</div>
			</article>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Edit } from 'lucide-vue-next'

const dropdownChildren = () => {
    const res = [] as any[]
    res.push({ name: 'View', func: (data) => { useRouter().push(`/spaces/${data.id}`) }, class: 'w-full', icon: Edit })
    return res
}


defineProps({
	spaces: {
		type: Array as PropType<any[]>,
		required: true
	}
})
</script>

<style scoped></style>
