import { getFirestoreCollectionWithWhereQuery } from '@/firebase/firestore/query'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'





const fetchedSpaces = ref([] as any[])

const SpaceIsEmpty = computed(() => {
    return fetchedSpaces.value.length === 0
})

export const useFetchUserSpaces = () => {
    const { id: user_id } = useUser()
    const loading = ref(false)

    const fetchUserSpaces = async () => {
        loading.value = true
        fetchedSpaces.value = []

        try {
            await getFirestoreCollectionWithWhereQuery('spaces', fetchedSpaces, { name: 'user_id', operator: '==', value: user_id.value })
            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    return { loading, fetchedSpaces, fetchUserSpaces, SpaceIsEmpty }
}

