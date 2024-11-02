import { watchDebounced } from '@vueuse/core'
import { ProfileType } from '../types/profile'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'
import { callFirebaseFunction } from '@/firebase/functions'



const profileFormState = {
	username: ref(''),
	name: ref(''),
	email: ref(''),
	phone: ref('')

}








export const useUsername = () => {
	const isUsernameAvailable = ref(true)
	const loading = ref(false)

	const checkUsername = async () => {
		loading.value = true
		profileFormState.username.value = profileFormState.username.value.replace(/ /g, '').toLowerCase()


			const { exists } = await callFirebaseFunction('checkUsernameForBooking', { username: profileFormState.username.value }) as any



		if (exists) {
			isUsernameAvailable.value = false
		} else {
			isUsernameAvailable.value = true
		}
		loading.value = false
	}

	watchDebounced(profileFormState.username, checkUsername, { debounce: 500 })

	return { isUsernameAvailable, checkUsername, loading }
}


