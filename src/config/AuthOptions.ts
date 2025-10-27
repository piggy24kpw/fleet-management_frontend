import authRoutes from '@/api/auth/routes'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { AuthOptions } from 'next-auth'

export const fetchTicketData = async (token: string) => {
	const baseURL = process.env.BASE_URL + '/api'

	const response = await fetch(baseURL + authRoutes.getUserDetail, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	if (!response.ok) {
		throw new Error(
			`Request failed with status ${response.status}: ${response.statusText}`
		)
	}

	const data = await response.json()

	return {
		id: data.data.id,
		role_id: data.data.roleId,
		role_name: data.data.roleName,
		company_id: data.data.companyId,
	}
}

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Centralized Authentication',
			credentials: {
				identifier: { label: 'Identifier' },
				password: { label: 'Password' },
			},
			async authorize() {
				return null
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token }) {
			

			return token
		},
		async session({ session, token }) {
			
if (token) {
				session.user =  {...token}
			}
			return session
		},
	},
	pages: {
		signIn: '/admin',
		signOut: '/',
		error: '/',
	},
	cookies: {
		sessionToken: {
			name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
			options: {
				domain:
					process.env.NODE_ENV != 'production'
						? '.aceplus.localhost'
						: '.' + process.env.APP_DOMAIN,
				path: '/',
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
			},
		},
	},
}
