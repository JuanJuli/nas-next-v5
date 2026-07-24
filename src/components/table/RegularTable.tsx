"use client"

import { useTableQuery } from "@/hooks/useTableQuery"
import { useDebounce } from "@/hooks/useDebounce"
import { Table, Button } from "antd"
import { useState, useEffect, useRef } from "react"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { getOffset } from "@/helper/urlQuery"
import Search from "antd/es/input/Search"

export default function RegularTable({
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
  onChangeParams,
  actionBtn,
}: any) {
  const [params, setParams] = useState({
    limit: 10,
    offset: 0,
    page: 1,
    search: "",
  })

  useEffect(() => {
    if (onChangeParams) {
      onChangeParams(params);
    }

  },[params, onChangeParams])
  
  const [searchValue, setSearchValue] = useState("")
  const debouncedSearchValue = useDebounce(searchValue, 500)
  const isFirstMount = useRef(true)

  const { data, isLoading } = useTableQuery(url, params, queryParams)

  const handleTableChange = (pag: any, _: any, sorter: any) => {
    const offset = getOffset(pag.current, pag.pageSize);
    setParams((prev) => ({
      ...prev,
      limit: pag.pageSize,
      offset: offset,
      sortField: sorter.field || "",
      sortOrder: sorter.order || "",
      page: pag.current,
    }))
  }

  // Update params ketika debounced search value berubah
  useEffect(() => {
    // Skip update pada initial mount untuk menghindari query berulang
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    
    setParams((prev) => ({
      ...prev,
      search: debouncedSearchValue,
      offset: 0,
      page: 1,
    }))
  }, [debouncedSearchValue])

  return (
    <div>
      <div className="w-full flex justify-between">
      {search && (
        <Search
          value={searchValue}
          placeholder="Search..."
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ marginBottom: 16, width: 300 }}
        />
      )}

      {actionBtn && (
        <>{actionBtn}</>
      )}
      </div>

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
          showTotal: (total: number, range: [number, number]) => `${range[0]}-${range[1]} dari ${total} data`,
          itemRender: (currentPage, type, originalElement) => {
            if (type === 'prev') {
              return (
                <Button className="mx-1" icon={<LeftOutlined />}>
                  Sebelumnya
                </Button>
              );
            }

            if (type === 'next') {
              return (
                <Button
                  className="mx-1 ml-3"
                  icon={<RightOutlined />}
                >
                  Berikutnya
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
