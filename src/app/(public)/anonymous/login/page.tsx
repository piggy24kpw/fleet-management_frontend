'use client'

import { useForm } from "react-hook-form"
import { SignInForm } from "../../../../template/dto/common"
import { authStore } from "../../../../template/store/auth-result.store"
import { signInRequest } from "@/api/auth/client"
import { useRouter } from "next/navigation"

export default function SignIn() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<SignInForm>()
  const { setAuth } = authStore()

  async function signIn(form: SignInForm) {
    try {
      const result = await signInRequest(form)
      if (result) {
        setAuth(result)
        router.push(`/${result.role.toLowerCase()}`)
      }
    } catch (e) {
      console.error("Sign-in failed:", e)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
          <i className="bi-unlock text-indigo-500"></i> Sign In
        </h2>

        <form onSubmit={handleSubmit(signIn)} className="space-y-4">
          <div>
            <input
              type="number"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.userId ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="User ID"
              {...register('userId', { required: "Please enter user ID" })}
            />
            {errors.userId && <p className="text-sm text-red-500 mt-1">{errors.userId.message}</p>}
          </div>

          <div>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.organization ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Username"
              {...register('username', { required: "Please enter organization" })}
            />
            {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.organization ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Email"
              {...register('email', { required: "Please enter email" })}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.organization ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Organization"
              {...register('organization', { required: "Please enter organization" })}
            />
            {errors.organization && <p className="text-sm text-red-500 mt-1">{errors.organization.message}</p>}
          </div>

          <div>
            <input
              type="password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.secretKey ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Secret Key"
              {...register('secretKey', { required: "Please enter secret key" })}
            />
            {errors.secretKey && <p className="text-sm text-red-500 mt-1">{errors.secretKey.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
          >
            <i className="bi-unlock"></i> Sign In
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 text-center">
          © 2025
        </p>
      </div>
    </div>
  )
}
