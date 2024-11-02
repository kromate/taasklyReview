import { v4 as uuidv4 } from 'uuid'
import { FieldValue } from 'firebase-admin/firestore'
import { setFirestoreSubDocument } from '@/firebase/firestore/create'
import { useAlert } from '@/composables/core/notification'
import { updateFirestoreDocument } from '@/firebase/firestore/edit'

const spaceTestimonialData = ref({
    rating: 0,
    review: '',
    customer: {
        name: '',
        email: '',
        location: ''
    }
})

export const useCreateSpaceTestimonial = () => {
    const loading = ref(false)


    const createSpaceTestimonial = async (space_id: string) => {
        loading.value = true
        const testimonial_id = uuidv4()
        const sent_data = {
            id: testimonial_id,
            space_id,
            ...spaceTestimonialData.value,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }

        try {
            await setFirestoreSubDocument('spaces', space_id, 'testimonials', testimonial_id, sent_data)
            updateFirestoreDocument('spaces', space_id, { updated_at: new Date().toISOString(), reviews_count: FieldValue.increment(1) })
            useAlert().openAlert({ type: 'SUCCESS', msg: 'Review submitted successfully', addrs: 'useCreateSpaceTestimonial' })
            loading.value = false
        } catch (error: any) {
            useAlert().openAlert({ type: 'ERROR', msg: error.message, addrs: 'useCreateSpaceTestimonial' })
            loading.value = false
        }
    }

    return { loading, createSpaceTestimonial, spaceTestimonialData }
}
