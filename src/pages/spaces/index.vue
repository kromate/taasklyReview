<template>
	<main class="flex flex-col gap-8 p-4 container mt-10 items-center">
		<div v-if="!spacesLoading && !SpaceIsEmpty" class="w-full">
			<SpaceList :spaces="fetchedSpaces" />
		</div>

		<div v-if="spacesLoading" class="flex flex-col gap-4">
			<Skeleton v-for="n in 3" :key="n" height="122px" radius="6px" />
		</div>

		<div
			v-if="SpaceIsEmpty && !spacesLoading"
			class="flex flex-col items-center justify-center gap-4 mt-24 max-w-xl text-center"
		>
			<FileText :size="60" />
			<h3 class="text-2xl font-medium">
				You don't have any spaces yet
			</h3>
			<p class="text-dark text-lg">
				Create a new space for your business, product, or project and start collecting reviews
			</p>

			<button class="btn-primary gap-4 px-4 " @click="useSpaceModal().openCreateSpace()">
				<span class="flex items-center gap-2">
					<PlusCircle name="plus" />
					Add Space
				</span>
			</button>
		</div>
	</main>
</template>

<script setup lang="ts">
import { PlusCircle, FileText } from 'lucide-vue-next'
import { useFetchUserSpaces } from '@/composables/spaces/fetch'

import { useSpaceModal } from '@/composables/core/modals'




const { loading: spacesLoading, fetchedSpaces, fetchSpaces, SpaceIsEmpty } = useFetchUserSpaces()

fetchSpaces()
definePageMeta({
  layout: 'space',
  middleware: ['is-authenticated']
})
</script>

<style scoped></style>
