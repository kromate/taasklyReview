import { useMediaQuery } from '@vueuse/core'
import { setCustomHead } from '../core/head'

type headstateTypes = {
    title: string
    description?: string
    shouldShowTab?: boolean
    shouldShowFab?: boolean
    btnText?: string
    btnCall?: () => void
    loading?: Ref<boolean>
    children?: {
        label: string
        icon: any
        action: () => void
    }[]
}

const headstate = {
    title: ref('Loading...'),
    description: ref(),
    shouldShowTab: ref(true),
    shouldShowFab: ref(true),
    btnText: ref(''),
    btnCall: ref(() => {}),
    loading: ref(false),
    children: ref<{ label: string; icon: any; action:() => void }[]>([] as any)
}



export const usePageHeader = () => {
    const isLargeScreen = useMediaQuery('(min-width: 1024px)')



    const setPageHeader = ({ description, title = 'The UnNamed Title', btnText, btnCall, shouldShowFab, shouldShowTab, loading = headstate.loading, children = headstate.children.value }: headstateTypes) => {
        headstate.description.value = description
        headstate.title.value = title
        headstate.btnText.value = btnText as string
        headstate.btnCall.value = btnCall as () => void
        headstate.shouldShowFab.value = shouldShowFab as boolean
        headstate.shouldShowTab.value = shouldShowTab as boolean
        headstate.loading = loading
        headstate.children.value = children

        setCustomHead({
            title: `${title} | Taaskly`,
            desc: description
        })
    }


    return { headstate, setPageHeader, isLargeScreen }
}
