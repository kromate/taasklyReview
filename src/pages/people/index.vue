<template>
    <section class='p-5'>
        <Table class="w-full" :loading="loading" :headers="headers" :tableData="people">
            <template #option>
                <div class="flex justify-end bg-hover rounded-t-lg p-2 gap-4">
                    <button class='btn-primary' @click='usePeopleModal().openImportPerson()'>Import Contact(s)</button>
                    <button class='btn-primary' @click='usePeopleModal().openAddPerson()'>Add Person</button>

                </div>
            </template>
        </Table>
    </section>
</template>

<script setup lang="ts">
import { usePageHeader } from '@/composables/utils/header'
import { useFetchPeople } from '@/composables/people/fetch';
import { usePeopleModal } from '@/composables/core/modals';




const { people, loading, fetchPeople } = useFetchPeople()

fetchPeople()

const headers = [
    {
        text: 'Name',
        value: 'name'
    },
    // {
    //     text: 'Email',
    //     value: 'email'
    // }
]

definePageMeta({
    layout: 'dashboard',
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