<template>
    <Modal type="sidebar">
        <header class="top-0 left-0 w-full flex justify-between items-center bg-dark text-light px-5 py-3">
            <h2 class="modal-title text-light p-0">Import Person</h2>
            <button class="btn-sm">
                <XCircle />
            </button>
        </header>

        <section class="max-w-[85vw] md:max-w-[500px] p-5 w-full">
            <div class="w-full flex flex-col" v-if='fetchedIntegrations.length > 0'>
                <div class="flex justify-between items-center gap-8 mb-12">
                    <h2 class="label">
                        Select an account to import contacts from
                    </h2>
                    <button class='btn-sm' @click="link">
                        add account
                    </button>
                </div>



                <div class="grid gap-4">
                    <article v-for="integration in fetchedIntegrations" :key="integration.id" class="flex flex-wrap border border-line rounded-md p-4 gap-4 items-center">
                        <GoogleIcon class="w-10 h-10" />
                        <div class="flex flex-col gap-2">
                            <h1 class="font-medium">
                                {{ getIntegrationName(integration.type) }}
                            </h1>
                            <span class="text-sm link">
                                {{ integration.email }}
                            </span>
                        </div>
                        <button class="btn-sm ml-auto" @click="importContact(integration)">
                            Import
                        </button>
                    </article>
                </div>
            </div>
            <div class="w-full flex flex-col" v-else>
                <h2 class="label">No integrations found</h2>
                <button class="btn-primary" @click="link">
                    <span v-if="!loading">Link Google Contact</span>
                    <Spinner v-else />
                </button>
            </div>
        </section>

    </Modal>
</template>

<script setup lang="ts">
import { XCircle } from 'lucide-vue-next';
import { usePeopleModal } from '@/composables/core/modals';
import { useFetchIntegrations } from '@/composables/integrations/fetch';
import { useLinkGoogleIntegration } from '@/composables/integrations/link';
import GoogleIcon from '@/assets/icons/Google.vue';
import { useFetchGoogleContacts } from '@/composables/integrations/googleContact/fetch';

const { setSelectedContact } = useFetchGoogleContacts()
const { fetchedIntegrations, fetchUserIntegrations } = useFetchIntegrations()
const { link, loading, integrationKeys } = useLinkGoogleIntegration()

const importContact = (contact: any) => {
    setSelectedContact(contact)
    useRouter().push(`/people/import?from=${contact.email}`)
}

fetchUserIntegrations()

const getIntegrationName = (type: string) => {
    switch (type) {
        case 'google_contacts':
            return 'Google Contacts';
        // Add more cases for other integration types
        default:
            return type;
    }
}
</script>
