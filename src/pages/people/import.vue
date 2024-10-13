<template>
    <section class='p-5'>
        <Table ref="tableRef" class="w-full" :loading="loading" :headers="headers" :tableData="fetchedContact" :checkbox="true">
            <template #option>
                <div class="flex justify-end bg-hover rounded-t-lg p-2 gap-4">
                    <input v-model="searchQuery" type="text" placeholder="Search contacts" class="input-field mb-4">
                    <button @click="importSelectedContacts">Import Selected Contacts</button>
                </div>
            </template>
        </Table>

    </section>
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
import { usePeopleModal } from '@/composables/core/modals';
import { useFetchGoogleContacts } from '@/composables/integrations/googleContact/fetch';
import { watchDebounced } from '@vueuse/core';

const searchQuery = ref('')
const { fetchSelectedGoogleContact, fetchedContact, loading, contact_token } = useFetchGoogleContacts()

watchDebounced(searchQuery, (newQuery) => {
    fetchSelectedGoogleContact(newQuery)
}, { debounce: 500 })

watch(() => useRoute().query.from, async (newId) => {
    console.log(newId);
    if (newId) {
        fetchSelectedGoogleContact()
    }
}, { immediate: true }
)

const headers = [
    {
        text: 'Name',
        value: 'name'
    },
    {
        text: 'Phone',
        value: 'phone'
    },
    {
        text: 'Email',
        value: 'email'
    }
]

const tableRef = ref(null)

const importSelectedContacts = () => {
    const selectedContacts = tableRef.value.selectedItems
    console.log('Selected Contacts:', selectedContacts)
    // Perform the import logic with the selected contacts
}

definePageMeta({
    layout: 'dashboard',
    key: Math.random().toString(),
    middleware: ['is-authenticated', () => {
        usePageHeader().setPageHeader({
            title: 'People',
            description: 'Manage your people',
            shouldShowFab: false,
            shouldShowTab: false
        })
    }]
})
</script>

<style scoped></style>