import { space } from './id'
import { updateFirestoreDocument } from '@/firebase/firestore/edit'
import { useAlert } from '@/composables/core/notification'






export const useUpdateSpace = () => {
    const loading = ref(false)

    const updateSpace = async () => {
        const spaceData = {
            ...space.value,
            updated_at: new Date()
        }


        try {
            loading.value = true
            await updateFirestoreDocument('spaces', space.value.id, spaceData)
            loading.value = false
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Space updated successfully', addrs: 'useUpdateSpace' })
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'useUpdateSpace' })
        }
    }

    return { updateSpace, loading }
}



