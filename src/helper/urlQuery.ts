export interface IDefaultPagination {
  page?: number,
  limit?:number,
  offset?: number
}

export const parseParams = (sp: URLSearchParams, defaultPagi?: IDefaultPagination) => ({
  page: Number(sp.get("page") || defaultPagi?.page || 1),
  limit: Number(sp.get("pageSize") || defaultPagi?.limit || 10),
  search: sp.get("search") || "",
  sortField: sp.get("sortField") || "",
  sortOrder: sp.get("sortOrder") || "",
  offset: Number(sp.get("offset") || defaultPagi?.offset || 0),
})

export const buildQueryString = (params: any) => {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== undefined && value !== null) {
      query.set(key, String(value))
    }
  })

  return query.toString()
}

export const getOffset = (page: number, pageSize: number) => {
  const offset = (page - 1) * pageSize;
  return offset > 0 ? offset : 0;
};
