'use client'

import { useState } from "react"
import { UserDetails } from "@/api/orgadmin/users/user"
import { uploadProfile, updateProfile } from "@/api/orgadmin/users"  // ✅ import here
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import DriverCreateButton from "../drivers/driver-create"
import DriverDialog from "../drivers/driver-dialog"

interface Props {
  user: UserDetails & { newProfileFile?: File; profileImageUrl?: string }
  onClose: () => void
  onSave: () => void
}

export default function UserDetailDialog({ user, onClose, onSave }: Props) {
  const [formData, setFormData] = useState(user)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      setFormData(prev => ({
        ...prev,
        newProfileFile: file,
        profileImageUrl: URL.createObjectURL(file),
      }))
    }
  }

  const handleSubmit = async () => {
    if (!formData.newProfileFile) {
      onClose()
      return
    }

    setLoading(true)
    setError(null)

    try {
      // ✅ Decide whether to upload or update
      const response = formData.profileImage
        ? await updateProfile(user.id, formData.newProfileFile!)
        : await uploadProfile(user.id, formData.newProfileFile!)

      if (response && response.success) {
        onSave()
        onClose()
      } else {
        setError("Failed to upload profile image")
      }
    } catch (err) {
      console.error(err)
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          User Details
        </h2>

        <DriverDialog />

        {error && (
          <div className="text-red-600 text-center bg-red-100 rounded-lg py-2">
            {error}
          </div>
        )}

        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <img
              src={`http://localhost:8080${formData.profileImage || "/default-profile.png"}`}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-md hover:scale-105 transition-transform duration-200"
            />
          </div>

          {/* Hidden File Input */}
          <input
            id="profile-upload"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Custom Label acting as button */}
          <label
            htmlFor="profile-upload"
            className="cursor-pointer text-blue-600 font-medium hover:underline"
          >
            {formData.profileImage ? "Change Profile Image" : "Upload Profile Image"}
          </label>
        </div>

        {/* Info Fields */}
        <div className="space-y-3">
          <div className="border-b pb-2">
            <label className="block text-gray-500 text-sm">Username</label>
            <div className="text-gray-800 font-medium">{formData.username}</div>
          </div>

          <div className="border-b pb-2">
            <label className="block text-gray-500 text-sm">Email</label>
            <div className="text-gray-800 font-medium">{formData.email}</div>
          </div>

          <div className="border-b pb-2">
            <label className="block text-gray-500 text-sm">Organization</label>
            <div className="text-gray-800 font-medium">{formData.organization}</div>
          </div>

          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <label className="block text-gray-500 text-sm">Role</label>
              <div className="text-gray-800 font-medium">{formData.role}</div>
            </div>
            <DriverCreateButton accountId={formData.id} />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl px-5 py-2"
          >
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-xl px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  )
}
