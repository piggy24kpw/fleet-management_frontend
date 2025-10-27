// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { type DefaultSession } from 'next-auth'

// Extend the User interface
declare module 'next-auth' {
	interface User {
		id: number
		name: string
		email: string
		role: string
		accessToken: string
		refreshToken: string
		expires_in: string
		accessTokenExpires: number | undefined
		x_org_id: number
		x_org_key: string
		x_org_name: string
	}

	interface Organizations {
		id: number
		name: string
		key: string
	}

	interface Session {
		user: User
		token: Token
	}

	interface Token {
		token: string
		auth_id: string
	}
}

// Extend the JWT interface to include all properties from the User interface
declare module 'next-auth/jwt' {
	interface JWT {
		id: number
		name: string
		email: string
		phone: number
		gender: string
		role: string
		sub_domain: []
		accessToken: string
		refreshToken: string
		expires_in: string
		accessTokenExpires: number | undefined
		x_org_id: number
		x_org_key: string
		x_org_name: string
	}
}
