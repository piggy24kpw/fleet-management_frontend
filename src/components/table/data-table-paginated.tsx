'use client'

import { useEffect, useState } from 'react'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Edit, Trash2, Eye } from 'lucide-react'

interface Pager {
  page: number
  size: number
  total: number
}

interface PageResult<T> {
  contents: T[]
  pager: Pager
}

interface PaginatedTableProps<T> {
  title: string
  columns: { key: keyof T; label: string }[]
  fetchUrl: string
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  onView?: (row: T) => void
}

export function DataTablePaginated<T extends Record<string, any>>({
  title,
  columns,
  fetchUrl,
  onEdit,
  onDelete,
  onView,
}: PaginatedTableProps<T>) {
  const [data, setData] = useState<T[]>([])
  const [pager, setPager] = useState<Pager>({ page: 0, size: 10, total: 0 })
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchData = async (page = 0) => {
    setLoading(true)
    const res = await fetch(`${fetchUrl}?page=${page}&size=${pager.size}&search=${search}`)
    const json: PageResult<T> = await res.json()
    setData(json.contents)
    setPager(json.pager)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [search])

  const totalPages = Math.ceil(pager.total / pager.size)

  return (
    <div className="p-6 space-y-4 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Input
          placeholder="Search..."
          className="w-60"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={String(col.key)}>{col.label}</TableHead>
              ))}
              <TableHead className="text-center w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={String(col.key)}>{String(row[col.key])}</TableCell>
                  ))}
                  <TableCell className="flex justify-center gap-2">
                    {onView && (
                      <Button
                        size="icon"
                        variant="outline"
                        className="text-blue-600 hover:bg-blue-100 border-blue-300"
                        onClick={() => onView(row)}
                      >
                        <Eye size={16} />
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        size="icon"
                        variant="outline"
                        className="text-green-600 hover:bg-green-100 border-green-300"
                        onClick={() => onEdit(row)}
                      >
                        <Edit size={16} />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        size="icon"
                        variant="outline"
                        className="text-red-600 hover:bg-red-100 border-red-300"
                        onClick={() => onDelete(row)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center py-8 text-gray-400">
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center pt-2">
        <p className="text-sm text-gray-600">
          Showing {pager.page * pager.size + 1}–
          {Math.min((pager.page + 1) * pager.size, pager.total)} of {pager.total}
        </p>

        <div className="space-x-2">
          <Button
            variant="outline"
            disabled={pager.page === 0}
            onClick={() => fetchData(pager.page - 1)}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            disabled={pager.page + 1 >= totalPages}
            onClick={() => fetchData(pager.page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
