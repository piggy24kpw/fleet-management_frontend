'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DriverDetails } from "@/api/orgadmin/drivers/driver"

interface Props {
  driver: DriverDetails
  onClose: () => void
  onSave: (data: DriverDetails) => void
}

export default function DriverDetailsDialog({ driver, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<DriverDetails>(driver)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (field: keyof DriverDetails, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      await onSave(formData)
      setLoading(false)
      onClose()
    } catch (err: any) {
      setError(err.message || "Failed to save changes")
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Edit Driver Details
        </h2>

        {error && (
          <div className="text-red-600 text-center bg-red-100 rounded-lg py-2">
            {error}
          </div>
        )}

        {/* Profile Image */}
        <div className="flex flex-col items-center space-y-3">
          <img
            src={`http://localhost:8080${formData.profileImage || "/default-profile.png"}`}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-md"
          />
        </div>

        {/* Info Fields */}
        <div className="space-y-4">
          {/* ID (readonly) */}
          <div>
            <label className="block text-gray-500 text-sm">ID</label>
            <Input value={formData.id} readOnly className="bg-gray-100 cursor-not-allowed" />
          </div>

          {/* Username */}
          <div>
            <label className="block text-gray-500 text-sm">Username</label>
            <Input
              value={formData.username}
              onChange={e => handleChange("username", e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-500 text-sm">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={e => handleChange("email", e.target.value)}
            />
          </div>

          {/* License Number */}
          <div>
            <label className="block text-gray-500 text-sm">License Number</label>
            <Input
              value={formData.licenseNumber}
              onChange={e => handleChange("licenseNumber", e.target.value)}
            />
          </div>

          {/* License Type */}
          <div>
            <label className="block text-gray-500 text-sm">License Type</label>
            <Input
              value={formData.licenseType}
              onChange={e => handleChange("licenseType", e.target.value)}
            />
          </div>

          {/* License Expiry */}
          <div>
            <label className="block text-gray-500 text-sm">License Expiry</label>
            <Input
              type="date"
              value={new Date(formData.licenseExpiry).toISOString().split('T')[0]}
              onChange={e => handleChange("licenseExpiry", e.target.value)}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-500 text-sm">Status</label>
            <Input
              value={formData.status}
              onChange={e => handleChange("status", e.target.value)}
            />
          </div>

          {/* Organization (readonly) */}
          <div>
            <label className="block text-gray-500 text-sm">Organization</label>
            <Input
              value={formData.organization}
              readOnly
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl px-5 py-2"
          >
            Close
          </Button>
          <Button
            disabled={loading}
            onClick={handleSave}
            className="rounded-xl px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  )
}
