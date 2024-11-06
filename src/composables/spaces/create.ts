import { v4 as uuidv4 } from 'uuid'
import { getFirestoreCollectionWithWhereQuery } from '@/firebase/firestore/query'
import { setFirestoreDocument } from '@/firebase/firestore/create'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'



    const createSpaceData = reactive({
        name: '',
        description: '',
        username: ''
    })

export const useCreateSpace = () => {
    const { id: user_id } = useUser()
    const loading = ref(false)


    const createSpace = async () => {
        if (!createSpaceData.name.trim()) {
            useAlert().openAlert({ type: 'ERROR', msg: 'Please enter a name for the space' })
            return
        }

        loading.value = true
        try {
            const id = uuidv4()
            const initial_data = {
                id,
                user_id: user_id.value,
                name: createSpaceData.name.trim(),
                description: createSpaceData.description.trim(),
                username: createSpaceData.username,
                created_at: new Date(),
                updated_at: new Date(),
                reviews_count: 0
            }

            await setFirestoreDocument('spaces', id, initial_data)

            useRouter().push(`/spaces/${id}`)
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Space created successfully' })
        } catch (error) {
            console.error('Error creating space:', error)
            useAlert().openAlert({ type: 'ERROR', msg: 'Failed to create space. Please try again.' })
        } finally {
            loading.value = false
        }
    }

    return { createSpace, loading, createSpaceData }
}


export const useSpaceUsername = () => {
	const isUsernameAvailable = ref(true)
	const loading = ref(false)

	const checkUsername = async () => {
		loading.value = true
		createSpaceData.username = createSpaceData.username.replace(/ /g, '').toLowerCase()

        const usernames = ref([])

		await getFirestoreCollectionWithWhereQuery('spaces', usernames, { name: 'username', operator: '==', value: createSpaceData.username })



		if (usernames.value.length) {
			isUsernameAvailable.value = false
		} else {
			isUsernameAvailable.value = true
		}
		loading.value = false
	}

	watchDebounced(() => createSpaceData.username, checkUsername, { debounce: 500 })

	return { isUsernameAvailable, checkUsername, loading }
}
