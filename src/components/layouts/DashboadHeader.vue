<template>
	<header class=" flex items-center justify-between py-4 md:px-5 px-4 bg-transparent border-b">
		<div class="flex flex-col">
			<h3 class="font-cal max-w-36 sm:max-w-72 md:max-w-80 text-emphasis truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl ">
				{{ headstate.title.value }}
			</h3>
			<span class="hidden text-sm md:block">
				{{ headstate.description.value }}
			</span>
		</div>

		<button v-if="headstate.shouldShowTab.value && headstate.btnText.value && !headstate.children.value.length" class="btn-primary" :disabled="headstate.loading.value" @click="headstate.btnCall.value">
			<span v-if="!headstate.loading.value">	{{ headstate.btnText.value }}</span>
			<Spinner v-else />
		</button>

		<div v-if="headstate.children.value.length && headstate.shouldShowTab.value" class="flex items-center gap-4">
			<IconDropdown :children="dropdownChildren()" :data="{}" :button-text="headstate.btnText.value" class-name="min-w-[230px]" />
		</div>

		<div v-else class="w-auto md:hidden block">
			<AvatarDropdown />
		</div>
	</header>
</template>

<script setup lang="ts">
import { Edit } from 'lucide-vue-next'
import { usePageHeader } from '@/composables/utils/header'

import AvatarDropdown from '@/components/core/AvatarDropdown.vue'

const { headstate } = usePageHeader()

const dropdownChildren = () => {
	const res = [] as any[]
	const headstateChildren = headstate.children.value.map((child) => {
		return { name: child.label, func: child.action, icon: child.icon }
	})

	res.push(...headstateChildren)
    return res
}


</script>

<style scoped>
.btn-primary{
@apply text-sm px-5 py-3 md:text-base md:px-10
}
</style>
