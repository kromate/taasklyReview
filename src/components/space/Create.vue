<template>
	<Modal modal="$atts.modal" title="Create a new space" :is-full-height="false">
		<form class="flex flex-col gap-4" @submit.prevent="createSpace">
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700">Title</label>
				<input
					id="name"
					v-model="createSpaceData.name"
					type="text"
					required
					class="input-field"
					placeholder="Enter space name"
				>
			</div>

			<div class="field relative">
				<label for="username">Username</label>
				<input id="username" v-model="createSpaceData.username" type="text" class="input-field" autocomplete="additional-name2" required disabled>
				<Spinner v-if="checkUsernameLoading" class="!border-t-dark !border-[#0c030366] absolute right-4 top-9" />
				<span v-if="!isUsernameAvailable" class="text-rose-500 font-bold">This username is taken</span>
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
import { useCreateSpace, useSpaceUsername } from '@/composables/spaces/create'

const { createSpace, loading: createSpaceLoading, createSpaceData } = useCreateSpace()

const { isUsernameAvailable, checkUsername, loading: checkUsernameLoading } = useSpaceUsername()

watch(() => createSpaceData.name, (value) => {
	if (!value) {
		createSpaceData.username = ''
	} else {
		createSpaceData.username = value.toLowerCase().replace(/ /g, '-').trim()
	}
})
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
