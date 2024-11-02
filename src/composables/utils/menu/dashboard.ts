import { Users, Calendar, Clock, User, Settings, Grid3X3, MessageSquareTextIcon } from 'lucide-vue-next'


export const dashboardRoutes = () => {
	const id = useRoute().params.id

	return [
	{
		icon: MessageSquareTextIcon,
		name: 'Reviews',
		route: `/spaces/${id}`,
		main: true,
		type: 'all',
		bg: '#F7F4FF',
		color: '#4F1DEE'
	},

	{
		icon: Settings,
		name: 'Settings',
		route: `/spaces/${id}/settings`,
		type: 'all',
		bg: '#e5e7eb',
		color: '#18181B'
	}

]
}
