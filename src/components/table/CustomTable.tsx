"use client"

import { useTableQuery } from "@/hooks/useTableQuery"
import { useTableUrlState } from "@/hooks/useTableUrlState"
import { useDebounce } from "@/hooks/useDebounce"
import { Table, Button } from "antd"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getOffset } from "@/helper/urlQuery"
import Search from "antd/es/input/Search"
import { useTranslations } from 'next-intl'

export default function CustomTable({
  url,
  columns,
  rowKey,
  search = true,
  queryParams,
  className,
  id,
  width,
  height,
  expandedRowRender,
}: any) {
  const t = useTranslations('common')
  const { params, setParams } = useTableUrlState()
  const [searchValue, setSearchValue] = useState(params.search || "")
  const debouncedSearchValue = useDebounce(searchValue, 500)
  const isFirstMount = useRef(true)

  const { data, isLoading } = useTableQuery(url, params, queryParams)

  const handleTableChange = (pag: any, _: any, sorter: any) => {
    const offset = getOffset(pag.current, pag.pageSize);
    setParams({
      limit: pag.pageSize,
      offset: offset,
      sortField: sorter.field || "",
      sortOrder: sorter.order || "",
      page: pag.current,
    })
  }

  // Update params ketika debounced search value berubah
  useEffect(() => {
    // Skip update pada initial mount untuk menghindari query berulang
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    
    setParams({
      search: debouncedSearchValue,
      offset: 0,
      page: 1,
    })
  }, [debouncedSearchValue])

  return (
    <div>
      {search && (
        <Search
          value={searchValue}
          placeholder={t('search-placeholder')}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ marginBottom: 16, width: 300 }}
        />
      )}

      <Table
        id={id}
        className={`${className} total-left`}
        scroll={{
          x: width ? width : '550px',
          y: height ? height : '45vh',
        }}
        rowKey={rowKey}
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.count || 0,
          showSizeChanger: true,
          showTotal: (total: number, range: [number, number]) => t('pagination-of', { a: range[0], b: range[1], total }),
          itemRender: (currentPage, type, originalElement) => {
            if (type === 'prev') {
              return (
                <Button className="mx-1" icon={<ChevronLeft />}>
                  {t('pagination-prev')}
                </Button>
              );
            }

            if (type === 'next') {
              return (
                <Button
                  className="mx-1 ml-3"
                  icon={<ChevronRight />}
                >
                  {t('pagination-next')}
                </Button>
              );
            }
            return originalElement;
          }
        }}
        onChange={handleTableChange}
        expandable={
          expandedRowRender
            ? {
                expandedRowRender: expandedRowRender,
                defaultExpandedRowKeys: ['0'],
              }
            : undefined
        }
      />
    </div>
  )
}