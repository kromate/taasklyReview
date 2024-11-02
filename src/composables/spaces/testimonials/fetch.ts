import { getFirestoreSubCollection } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'
import { getFirestoreSubCollectionWithWhereQuery } from '@/firebase/firestore/query'





const fetchedSpaceTestimonials = ref([] as any[])

const SpaceTestimonialsIsEmpty = computed(() => {
    return fetchedSpaceTestimonials.value.length === 0
})

export const useFetchSpaceTestimonials = () => {
    const loading = ref(false)

    const fetchSpaceTestimonials = async (id: string) => {
        loading.value = true
        fetchedSpaceTestimonials.value = []

        try {
            await getFirestoreSubCollection('spaces', id, 'testimonials', fetchedSpaceTestimonials)
            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    return { loading, fetchedSpaceTestimonials, fetchSpaceTestimonials, SpaceTestimonialsIsEmpty }
}

export const useFetchPublicSpaceTestimonials = () => {
    const loading = ref(false)

    const fetchPublicSpaceTestimonials = async (id: string) => {
        loading.value = true
        fetchedSpaceTestimonials.value = []

        await getFirestoreSubCollectionWithWhereQuery('spaces', id, 'testimonials', fetchedSpaceTestimonials, { name: 'public', operator: '==', value: true })
        loading.value = false
    }

    return { loading, fetchPublicSpaceTestimonials, fetchedSpaceTestimonials, SpaceTestimonialsIsEmpty }
}
