import { v4 as uuidv4 } from 'uuid'

import { AtSign, FileIcon, PhoneIcon, CheckSquare2, CircleDot } from 'lucide-vue-next'
import { setFirestoreDocument } from '@/firebase/firestore/create'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'
import TextIcon from '@/assets/icons/Text.vue'
import LongTextIcon from '@/assets/icons/LongText.vue'



export const useCreateSpace = () => {
    const { id: user_id } = useUser()
    const loading = ref(false)
    const createSpaceData = reactive({
        title: '',
        description: ''
    })

    const createSpace = async () => {
        if (!createSpaceData.title.trim()) {
            useAlert().openAlert({ type: 'ERROR', msg: 'Please enter a title for the space' })
            return
        }

        loading.value = true
        try {
            const id = uuidv4()
            const initial_data = {
                id,
                user_id: user_id.value,
                title: createSpaceData.title.trim(),
                description: createSpaceData.description.trim(),
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
