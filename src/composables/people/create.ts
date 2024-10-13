import { setFirestoreSubDocument } from '@/firebase/firestore/create'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'
import { v4 as uuidv4 } from 'uuid'
import { usePeopleModal } from '@/composables/core/modals';

interface PersonForm {
    name: string;
    date_met: string;
    notes: string;
    email: string;
    phone: string;
    integration: Record<string, any>;
}

export const useCreatePerson = () => {
    const { id: user_id } = useUser()
    const personForm = ref<PersonForm>({
        name: '',
        date_met: '',
        notes: '',
        email: '',
        phone: '',
        integration: {},
    });


    const loading = ref(false);

    const createPerson = async () => {
        loading.value = true;
        const id = uuidv4()
        const sent_data = {
            ...personForm.value,
            id: id,
            date_met: new Date(personForm.value.date_met).toISOString(),
            owner_id: user_id.value!,
            mode: 'manual'
        } as any
        try {
            if (personForm.value.integration && personForm.value.integration.type === 'google_contacts') {
                const { data, error } = await useFetch('/api/integrations/google_contacts/create', {
                    method: 'POST',
                    body: {
                        ...personForm.value.integration,
                        name: personForm.value.name,
                        email: personForm.value.email,
                        phone: personForm.value.phone,
                        person_id: id
                    }
                })
                if (error.value) {
                    throw new Error(error.value.message || 'Failed to create Google contact')
                }
                sent_data.integration_id = data.value?.data?.resourceName
            }
            await setFirestoreSubDocument('users', user_id.value!, 'people', id, sent_data)
            usePeopleModal().closeAddPerson()
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Person created successfully' })
        } catch (error: any) {
            console.error(error)
            useAlert().openAlert({ type: 'ERROR', msg: error.message || 'Failed to create person' })
        } finally {
            loading.value = false;
        }
    };

    return {
        personForm,
        createPerson,
        loading,
    };
};