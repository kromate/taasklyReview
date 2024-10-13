import { Users, Calendar, Clock, User, Settings, Grid3X3, Wallet } from 'lucide-vue-next'

export const dashboardRoutes = () => [

	{
		icon: Users,
		name: 'People',
		route: '/people',
		main: true,
		bg: '#e5e7eb',
		color: '#18181B'
	},

	{
		icon: Grid3X3,
		name: 'Integrations',
		route: '/integrations',
		type: 'all',
		bg: '#e5e7eb',
		color: '#18181B'
	},
	{
		icon: Settings,
		name: 'Settings',
		route: '/settings',
		type: 'all',
		bg: '#e5e7eb',
		color: '#18181B'
	}

]
