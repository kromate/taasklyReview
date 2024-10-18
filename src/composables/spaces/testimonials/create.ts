import { callFirebaseFunction } from '@/firebase/functions'
import { useAlert } from '@/composables/core/notification'

export const useCreateSpaceTestimonial = () => {
    const loading = ref(false)
    const spaceData = ref({})

    const createSpaceTestimonial = async (space_object: any) => {
        loading.value = true
        const sent_data = {
            space_id: space_object.id,
            response: spaceData.value
        }

        const res = await callFirebaseFunction('createSpaceTestimonial', sent_data) as any

        if (res.code === 200) {
            useAlert().openAlert({ type: 'SUCCESS', msg: res.msg, addrs: 'useCreateSpaceTestimonial' })
            loading.value = false
            useRouter().push(`/v/${space_object.id}/submitted`)
        } else {
            useAlert().openAlert({ type: 'ERROR', msg: res.msg, addrs: 'useCreateSpaceTestimonial' })
            loading.value = false
        }
    }

    return { loading, createSpaceTestimonial, spaceData }
}
