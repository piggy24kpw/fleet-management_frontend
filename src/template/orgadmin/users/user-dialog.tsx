'use client'

import { getAllRoleNames, updateUser } from "@/api/orgadmin/users"
import { UserDetails } from "@/api/orgadmin/users/user"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { UserCog } from "lucide-react"
import { useEffect, useState } from "react"

export default function UserDialog() {
  const [selectedUser, setSelectedUser] = useState<UserDetails & { newProfileFile?: File; profileImageUrl?: string } | null>(null)
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://10.253.73.214:8080"
  const [roles, setRoles] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchRoles() {
      setLoading(true)
      try {
        const data = await getAllRoleNames()
        setRoles(data)
      } catch (error) {
        console.error("Error fetching roles:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchRoles()
  }, [])

  
  const handleUpdateUser = async () => {
    if (!selectedUser) return

    const formData = new FormData()
    formData.append("username", selectedUser.username)
    formData.append("organization", selectedUser.organization ?? "")
    formData.append("role", selectedUser.role ?? "")
    if (selectedUser.newProfileFile) {
      formData.append("profileImage", selectedUser.newProfileFile)
    }

    try {
      setLoading(true)
      const response = await updateUser(selectedUser.id)
      console.log("User updated:", response)
      alert("User updated successfully!")
      setSelectedUser(null)
    } catch (error) {
      console.error("Error updating user:", error)
      alert("Failed to update user.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {selectedUser && (
        <Dialog open={true} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="max-w-md">
            <DialogTitle className="text-xl font-semibold text-center mb-4">
              User Details
            </DialogTitle>

            <div className="flex flex-col items-center gap-4">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={
                    selectedUser.profileImageUrl ||
                    (selectedUser.profileImage
                      ? `${API_BASE_URL}${selectedUser.profileImage}`
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          selectedUser.username
                        )}&background=random`)
                  }
                  alt={selectedUser.username}
                  className="w-24 h-24 rounded-full border shadow-sm object-cover"
                />
                
                {/* Update Button */}
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-0 right-0 bg-white border rounded-full p-1 cursor-pointer hover:bg-gray-100"
                >
                  <UserCog size={16} className="text-gray-600" />
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const imageUrl = URL.createObjectURL(file)
                      setSelectedUser({
                        ...selectedUser,
                        profileImageUrl: imageUrl,
                        newProfileFile: file,
                      })
                    }
                  }}
                />
              </div>

              {/* User Info */}
              <div className="w-full space-y-3">
                <div>
                  <label className="font-medium text-gray-700">Username:</label>
                  <div className="border rounded-md p-2 mt-1 bg-gray-50 text-gray-800">
                    {selectedUser.username}
                  </div>
                </div>

                <div>
                  <label className="font-medium text-gray-700">Email:</label>
                  <div className="border rounded-md p-2 mt-1 bg-gray-50 text-gray-800">
                    {selectedUser.email}
                  </div>
                </div>

                <div>
                  <label className="font-medium text-gray-700">Organization:</label>
                  <input
                    type="text"
                    value={selectedUser.organization ?? ""}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, organization: e.target.value })
                    }
                    className="border p-2 rounded-md w-full mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="font-medium text-gray-700">Role:</label>
                  <select
                    value={selectedUser.role ?? ""}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, role: e.target.value })
                    }
                    disabled={loading}
                    className="border p-2 rounded-md w-full mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-sm text-gray-500 mt-3">
                  {selectedUser.createdAt && (
                    <div>
                      <strong>Created At:</strong>{" "}
                      {new Date(selectedUser.createdAt).toLocaleDateString()}
                    </div>
                  )}
                  {selectedUser.deletedAt && (
                    <div>
                      <strong>Deleted At:</strong>{" "}
                      {new Date(selectedUser.deletedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-4 justify-end w-full">
                <Button variant="default" onClick={handleUpdateUser} disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </Button>
                <DialogClose asChild>
                  <Button variant="outline" disabled={loading}>
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
