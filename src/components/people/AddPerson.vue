<template>
    <Modal type="sidebar">
        <header class=" top-0 left-0 w-full flex justify-between items-center bg-dark text-light px-5 py-3">
            <h2 class="modal-title text-light p-0">New Person</h2>
            <button class="btn-sm" @click="usePeopleModal().closeAddPerson()">
                <XCircle />
            </button>
        </header>

        <section class="min-w-[85vw] md:min-w-[500px] p-5">
            <div class="auth-form">
                <div class="field">
                    <label for="name">Name</label>
                    <input id="name" v-model="personForm.name" type="text" class="input-field" required>
                </div>
                <div class="field">
                    <label for="date_met">Date Met</label>
                    <input id="date_met" v-model="personForm.date_met" type="date" class="input-field" required>
                </div>
                <div class="field">
                    <label for="notes">Notes</label>
                    <textarea id="notes" v-model="personForm.notes" class="input-textarea" rows="4" required></textarea>
                </div>
                <div class="field">
                    <label for="email">Email</label>
                    <input id="email" v-model="personForm.email" type="email" class="input-field">
                </div>
                <div class="field">
                    <label for="phone">Phone</label>
                    <input id="phone" v-model="personForm.phone" type="tel" class="input-field">
                </div>
                <div class="field" v-if="fetchedIntegrations.length > 0">
                    <label for="integration">Select an account to add the contact to:</label>
                    <select id="integration" v-model="selectedIntegration" class="input-field">
                        <option value="">Select an account</option>
                        <option v-for="integration in fetchedIntegrations" :key="integration.id" :value="integration.id">
                            {{ getIntegrationName(integration.type) }} - {{ integration.email }}
                        </option>
                    </select>
                </div>
            </div>
        </section>
        <footer class="flex justify-end p-5 mt-auto bottom-0 absolute inset-x-0">
            <button class="btn-primary w-full mt-4" @click="handleCreatePerson" :disabled="loading || !isFormValid">
                <span v-if="!loading">Create Person</span>
                <Spinner v-else />
            </button>
        </footer>
    </Modal>
</template>

<script setup lang="ts">
import { useCreatePerson } from '@/composables/people/create';
import { XCircle } from 'lucide-vue-next';
import { useFetchIntegrations } from '@/composables/integrations/fetch';
import { useAlert } from '@/composables/core/notification'
import { usePeopleModal } from '@/composables/core/modals';

const { fetchUserIntegrations, fetchedIntegrations } = useFetchIntegrations();
const { personForm, createPerson, loading } = useCreatePerson();

const selectedIntegration = ref('');

fetchUserIntegrations();

const getIntegrationName = (type: string) => {
    switch (type) {
        case 'google_contacts':
            return 'Google Contacts';
        // Add more cases for other integration types
        default:
            return type;
    }
};

const isFormValid = computed(() => {
    return personForm.value.name.trim() !== '' && personForm.value.date_met !== '';
});

const handleCreatePerson = async () => {
    if (!isFormValid.value) {
        useAlert().openAlert({ type: 'ERROR', msg: 'Please fill in all required fields' });
        return;
    }

    if (selectedIntegration.value) {
        const integration = fetchedIntegrations.value.find(i => i.id === selectedIntegration.value);
        if (integration) {
            personForm.value.integration = {
                type: integration.type,
                access_token: integration.access_token,
                refresh_token: integration.refresh_token,
                expiry_date: integration.expiry_date
            };
        }
    }

    await createPerson();
};
</script>
