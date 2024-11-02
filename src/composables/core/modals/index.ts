import { modal } from '../modal'

// ==================== AUTH ===============================
import Logout from '@/components/modals/auth/logout.vue'

// ==================== CORE ===============================
import Confirmation from '@/components/modals/core/Confirmation.vue'
import LoadingVerification from '@/components/modals/core/loading.vue'

// ==================== BOTTOMBAR ===============================
import BottomMenu from '@/components/layouts/bottomBar/modal/Main.vue'

// ==================== SPACE ===============================
import CreateSpace from '@/components/space/Create.vue'




type AuthTypes = 'Logout'
type CoreTypes = 'Confirmation' | 'LoadingVerification'
type BottombarTypes = 'BottomMenu'
type SpaceTypes = 'CreateSpace'




const AuthModals = { Logout } as Record<AuthTypes, any>
const CoreModals = { Confirmation, LoadingVerification } as Record<CoreTypes, any>
const BottombarModals = { BottomMenu } as Record<BottombarTypes, any>
const SpaceModals = { CreateSpace } as Record<SpaceTypes, any>



const authModal = modal.register('Auth', AuthModals)
const coreModal = modal.register('Core', CoreModals)
const bottombarModal = modal.register('Bottombar', BottombarModals)
const spaceModal = modal.register('Space', SpaceModals) 




export const useAuthModal = () => authModal
export const useCoreModal = () => coreModal
export const useBottombarModal = () => bottombarModal
export const useSpaceModal = () => spaceModal




