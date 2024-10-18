import { getSingleFirestoreDocument } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'


export const space = ref()
const loading = ref(false)

export const useFetchSpaceById = () => {
    const { id: user_id } = useUser()

    const fetchSpaceById = async (id: string) => {
        loading.value = true
        try {
            await getSingleFirestoreDocument('spaces', id, space)
            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'useFetchSpaceById' })
        }
    }



    return { space, loading, fetchSpaceById }
}