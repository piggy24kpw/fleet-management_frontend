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
import { UserListItem, UserDetails } from "@/api/orgadmin/users/user"
import { deleteAccount, getAllUsers, getUserById } from "@/api/orgadmin/users"
import { UserCog, Trash2 } from "lucide-react"
import UserDetailDialog from "./user-details"

export default function UserListTemplate() {
  const [users, setUsers] = useState<UserListItem[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllUsers(page, 10)
      setUsers(data?.contents ?? [])
      setTotalPages(data?.pager?.totalPage ?? 1)
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

  const handleUserDetail = async (id: number) => {
    try {
      const userDetail = await getUserById(id)
      setSelectedUser(userDetail)
      setIsDialogOpen(true)
    } catch (error) {
      console.error("Failed to fetch user detail:", error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteAccount(id)
      if (response && response.success) {
        fetchUsers() // refresh list after deletion
      } else {
        console.error("Failed to delete user")
      }
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">User List</h1>
      </div>

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
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.organization}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="outline" onClick={() => handleUserDetail(user.id)}>
                      <UserCog className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" onClick={() => handleDelete(user.id)}>
                      <Trash2 className="h-4 w-4" />
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
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button disabled={page === 0 || loading} onClick={() => setPage(page - 1)}>Previous</Button>
        <span className="text-gray-600">Page {page + 1} of {totalPages}</span>
        <Button disabled={page + 1 >= totalPages || loading} onClick={() => setPage(page + 1)}>Next</Button>
      </div>

      {/* User Detail Dialog */}
      {isDialogOpen && selectedUser && (
        <UserDetailDialog
          user={selectedUser}
          onClose={() => setIsDialogOpen(false)}
          onSave={fetchUsers} // refresh list after update
        />
      )}
    </div>
  )
}
