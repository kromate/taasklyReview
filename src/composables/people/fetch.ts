import { getFirestoreSubCollection } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'


export const useFetchPeople = () => {
    const { id: user_id } = useUser()
    const loading = ref(false)
    const people = ref([])

    const fetchPeople = async () => {
        if (people.value.length > 0) return
        loading.value = true

        try {
            await getFirestoreSubCollection('users', user_id.value!, 'people', people)

            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'useFetchPeople' })
        }
        
    }

    return { people, loading, fetchPeople }
}