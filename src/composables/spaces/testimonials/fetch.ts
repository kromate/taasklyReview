import { getFirestoreSubCollection } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'





const fetchedSpaceSubmissions = ref([] as any[])

const SpaceSubmissionsIsEmpty = computed(() => {
    return fetchedSpaceSubmissions.value.length === 0
})

export const useFetchSpaceSubmissions = () => {
    const { id: user_id } = useUser()
    const loading = ref(false)

    const fetchUserSpaceSubmissions = async (id: string) => {
        loading.value = true
        fetchedSpaceSubmissions.value = []

        try {
            await getFirestoreSubCollection('spaces', id, 'submissions', fetchedSpaceSubmissions)
            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    return { loading, fetchedSpaceSubmissions, fetchUserSpaceSubmissions, SpaceSubmissionsIsEmpty }
}

