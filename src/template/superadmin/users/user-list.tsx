'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserListItem, UserDetails } from "@/api/superadmin/users/user"
import { getAllRoleNames, getAllUsers, getUserById, updateUser } from "@/api/superadmin/users"
import { UserCog, Trash2 } from "lucide-react"


export default function UserListTemplate() {
  const [users, setUsers] = useState<UserListItem[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<UserDetails & { newProfileFile?: File; profileImageUrl?: string } | null>(null)

  const handleUserDetail = async (id: number) => {
    try {
      const userDetail = await getUserById(id)
      setSelectedUser(userDetail)
    } catch (error) {
      console.error("Failed to fetch user detail:", error)
    }
  }

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllUsers(page, 10)
      setUsers(data?.contents ?? [])
      setTotalPages(data?.pager?.totalPage ?? 0)
    } catch (err) {
      console.error("Failed to fetch users", err)
      setError("Failed to load users. Please try again.")
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [page])

  

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">User List</h1>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            ) : users.length > 0 ? (
              users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.organization}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleUserDetail(user.id)}
                    >
                      <UserCog className="size-3 gap-3" />
                    </Button>
                    <Button variant="ghost">
                      <Trash2 className="size-3 gap-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          disabled={page === 0 || loading}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>

        <span className="text-sm text-gray-600">
          Page {page + 1} of {totalPages || 1}
        </span>

        <Button
          variant="outline"
          disabled={page + 1 >= totalPages || loading}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
    </div>
  )
}
