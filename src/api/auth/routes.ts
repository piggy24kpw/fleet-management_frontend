const authRoutes = {
	login: '/auth/login',
	user_list: '/users',
	forgotPassword: 'auth/forgot-password',
	change_role: 'auth/userRole/${id}',
	change_status: 'auth/userStatus/${id}',
	refresh_token: '/auth/refresh-token',
	getUserDetail: '/auth/userDetail',
	logOut: '/auth/logout',
}

export default authRoutes
