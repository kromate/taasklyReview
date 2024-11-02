import { updateFirestoreSubDocument } from '@/firebase/firestore/edit'


export const useEditSpaceTestimonial = () => {

}


export const useUpdateSpaceTestimonial = () => {
    const loading = ref(false)

    const updatePublicStatus = async (data: any, status: boolean) => {
        loading.value = true

        updateFirestoreSubDocument('spaces', data.space_id, 'testimonials', data.id, { public: status })
    }

    return { loading, updatePublicStatus }
}
