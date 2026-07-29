"use client"

import { useState } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  searchKey?: string
  pageSize?: number
  pageSizeOptions?: number[]
  total?: number
  loading?: boolean
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void
  onSortingChange?: (sorting: SortingState) => void
  pageIndex?: number
}

export function DataTable<TData>({
  columns,
  data,
  searchKey,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [5, 10, 25, 50, 100],
  loading,
  total,
  onPaginationChange,
  onSortingChange,
  pageIndex: controlledPageIndex,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pageSize, setPageSize] = useState(initialPageSize)

  const isServerSide = !!onPaginationChange

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater
      setSorting(next)
      onSortingChange?.(next)
    },
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: isServerSide,
    pageCount: total ? Math.ceil(total / pageSize) : undefined,
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex: controlledPageIndex ?? 0,
        pageSize,
      },
    },
  })

  return (
    <div className="min-w-0">
      {searchKey && (
        <div className="flex items-center py-4">
          <Input
            placeholder="Search..."
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn(searchKey)?.setFilterValue(e.target.value)
            }
            className="max-w-sm"
          />
        </div>
      )}
      <div className={cn("rounded-xs border w-full overflow-x-auto", loading && "opacity-60 pointer-events-none")}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className={cn(header.column.columnDef.meta?.className as string)}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cn(cell.column.columnDef.meta?.className as string)}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {total != null
              ? `${total} total`
              : `${table.getFilteredRowModel().rows.length} row(s)`}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Rows per page:</span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => {
                const newSize = Number(value)
                setPageSize(newSize)
                table.setPageIndex(0)
                if (isServerSide) {
                  onPaginationChange({ pageIndex: 0, pageSize: newSize })
                }
              }}
            >
              <SelectTrigger className="h-7 w-fit" size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage()
              if (isServerSide) {
                onPaginationChange({
                  pageIndex: (controlledPageIndex ?? 0) - 1,
                  pageSize,
                })
              }
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {(() => {
              const currentPage = table.getState().pagination.pageIndex + 1
              const pageCount = table.getPageCount()
              const pages: (number | "ellipsis")[] = []
              const siblingCount = 1

              if (pageCount <= 7) {
                for (let i = 1; i <= pageCount; i++) pages.push(i)
              } else {
                pages.push(1)
                if (currentPage > siblingCount + 3) pages.push("ellipsis")
                const start = Math.max(2, currentPage - siblingCount)
                const end = Math.min(pageCount - 1, currentPage + siblingCount)
                for (let i = start; i <= end; i++) pages.push(i)
                if (currentPage < pageCount - siblingCount - 2) pages.push("ellipsis")
                pages.push(pageCount)
              }

              const handlePageChange = (page: number) => {
                const pageIndex = page - 1
                table.setPageIndex(pageIndex)
                if (isServerSide) {
                  onPaginationChange({ pageIndex, pageSize })
                }
              }

              return pages.map((page, idx) =>
                page === "ellipsis" ? (
                  <span key={`ellipsis-${idx}`} className="px-1 text-sm text-muted-foreground">
                    ...
                  </span>
                ) : (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                )
              )
            })()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage()
              if (isServerSide) {
                onPaginationChange({
                  pageIndex: (controlledPageIndex ?? 0) + 1,
                  pageSize,
                })
              }
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
