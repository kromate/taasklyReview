import axios from 'axios'
import { useAlert } from '@/composables/core/notification'

export const useFetchGoogleContacts = () => {
    const loading = ref(false)
    const _contact = useCookie('selected_google_contact') as any
    const fetchedContact = ref([])

    const contact_token = computed(() => _contact.value!.access_token)

    const setSelectedContact = (contact: any) => {
        _contact.value = contact
    }

    const fetchSelectedGoogleContact = async (searchQuery: string = '') => {
        loading.value = true
        try {
            const { data } = await axios.get('/api/integrations/google_contacts/fetch', {
                params: {
                    search: searchQuery
                }
            })
            console.log(data);
            fetchedContact.value = data
        } catch (e: any) {
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'useFetchGoogleContacts' })
        }
        loading.value = false
    }

    return { loading, fetchedContact, setSelectedContact, fetchSelectedGoogleContact, contact_token }
}