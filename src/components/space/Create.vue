<template>
	<Modal modal="$atts.modal" title="Create a new space" :is-full-height="false">
		<form class="flex flex-col gap-4" @submit.prevent="createSpace">
			<div>
				<label for="title" class="block text-sm font-medium text-gray-700">Title</label>
				<input
					id="title"
					v-model="createSpaceData.title"
					type="text"
					required
					class="input-field"
					placeholder="Enter space title"
				>
			</div>

			<div>
				<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
				<textarea
					id="description"
					v-model="createSpaceData.description"
					rows="3"
					class="input-textarea"
					placeholder="Enter space description (optional)"
				/>
			</div>

			<button
				type="submit"
				class="btn-primary bg-dark text-white"
				:disabled="createSpaceLoading"
			>
				<span v-if="!createSpaceLoading" class="flex items-center gap-2">
					Create Space
				</span>
				<Spinner v-else />
			</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { useCreateSpace } from '@/composables/spaces/create'

const { createSpace, loading: createSpaceLoading, createSpaceData } = useCreateSpace()
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
