"use client"

import { useTableQuery } from "@/hooks/useTableQuery"
import { useTableUrlState } from "@/hooks/useTableUrlState"
import { useDebounce } from "@/hooks/useDebounce"
import { Pagination, Skeleton, Button } from "antd"
import { useState, useEffect, useRef } from "react"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { getOffset } from "@/helper/urlQuery"
import Search from "antd/es/input/Search"

interface CustomListProps<T = any> {
  url: string
  renderItem: (item: T, index: number) => React.ReactNode
  rowKey: string | ((item: T) => string)
  layout?: 'list' | 'grid'
  search?: boolean
  queryParams?: Record<string, any>
  gap?: number
  minItemWidth?: number
  emptyText?: string
  id?: string
  className?: string
}

export default function CustomList<T = any>({
  url,
  renderItem,
  rowKey,
  layout = 'list',
  search: showSearch = true,
  queryParams,
  gap,
  minItemWidth = 300,
  emptyText = "Tidak ada data",
  id,
  className,
}: CustomListProps<T>) {
  const { params, setParams } = useTableUrlState({ limit: 3 })
  const [searchValue, setSearchValue] = useState(params.search || "")
  const debouncedSearchValue = useDebounce(searchValue, 500)
  const isFirstMount = useRef(true)

  const { data, isLoading } = useTableQuery(url, params, queryParams)

  const defaultGap = gap ?? (layout === 'grid' ? 16 : 8)
  const items = data?.data || []

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }

    setParams({
      search: debouncedSearchValue,
      offset: 0,
      page: 1,
      limit: 3
    })
  }, [debouncedSearchValue])

  const handleChange = (page: number, pageSize: number) => {
    if (pageSize !== params.limit) {
      const offset = getOffset(1, pageSize)
      setParams({ page: 1, limit: pageSize, offset })
    } else {
      const offset = getOffset(page, pageSize)
      setParams({ page, limit: pageSize, offset })
    }
  }

  const containerStyle: React.CSSProperties =
    layout === 'grid'
      ? {
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${minItemWidth}px, 1fr))`,
          gap: defaultGap,
        }
      : {
          display: 'flex',
          flexDirection: 'column',
          gap: defaultGap,
        }

  const getRowKey = (item: T, index: number): string => {
    if (typeof rowKey === 'function') return rowKey(item)
    return String((item as any)[rowKey] ?? index)
  }

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: params.limit }, (_, i) => (
        <div key={`skeleton-${i}`}>
          <Skeleton active />
        </div>
      ))
    }

    if (!isLoading && items.length === 0) {
      return <div className="text-center py-8 text-gray-500">{emptyText}</div>
    }

    return items.map((item: T, index: number) => (
      <div key={getRowKey(item, index)}>
        {renderItem(item, index)}
      </div>
    ))
  }

  return (
    <div id={id} className={className}>
      {showSearch && (
        <Search
          value={searchValue}
          placeholder="Search..."
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ marginBottom: 16, width: 300 }}
        />
      )}

      <div style={containerStyle}>
        {renderContent()}
      </div>

      {!isLoading && (data?.count ?? 0) > 0 && (
        <div className="mt-4 flex justify-end">
          <Pagination
            defaultPageSize={3}
            current={params.page}
            pageSize={params.limit}
            total={data?.count || 0}
            showSizeChanger
            showTotal={(total, range) => `${range[0]}-${range[1]} dari ${total} data`}
            onChange={handleChange}
            itemRender={(currentPage, type, originalElement) => {
              if (type === 'prev') {
                return (
                  <Button className="mx-1" icon={<LeftOutlined />}>
                    Sebelumnya
                  </Button>
                )
              }
              if (type === 'next') {
                return (
                  <Button className="mx-1 ml-3" icon={<RightOutlined />}>
                    Berikutnya
                  </Button>
                )
              }
              return originalElement
            }}
          />
        </div>
      )}
    </div>
  )
}
