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

      console.log("Sign-in result:", result)

      if (result) {
        setAuth(result) // ✅ store user data
        console.log("Stored auth:", authStore.getState().auth)

        // ✅ navigate to the role-based page
        router.push(`/${result.role.toLowerCase()}`)
      }
    } catch (e) {
      console.error("Sign-in failed:", e)
    }
  }

  return (
    <div className="w-50">
      <h3><i className="bi-unlock"></i> Sign In</h3>

      <form onSubmit={handleSubmit(signIn)} className="mt-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter email address."
          {...register('username', { required: "Please enter email for login." })}
        />
        {errors.username && <span className="text-sm text-danger">{errors.username?.message}</span>}

        <input
          type="password"
          className="form-control"
          placeholder="Enter password."
          {...register('password', { required: "Please enter password." })}
        />
        {errors.password && <span className="text-sm text-danger">{errors.password?.message}</span>}

        <div className="mt-3">
          <button type="submit" className="btn btn-secondary">
            <i className="bi-unlock"></i> Sign In
          </button>
        </div>
      </form>
    </div>
  )
}
