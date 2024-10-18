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
    const createSpaceData = {
        title:ref(''),
        description:ref('')
    }

    const createSpace = async () => {
        const id = uuidv4()
        const initial_data = {
            id,
            user_id: user_id.value,
            title: createSpaceData.title.value,
            description: createSpaceData.description.value,
            created_at: new Date(),
            updated_at: new Date(),
        } 

        const space = await setFirestoreDocument('spaces', id, initial_data)
        useRouter().push(`/spaces/${id}`)
    }


    return { createSpace, loading }
}