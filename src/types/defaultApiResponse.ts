import { LspLoginResponse } from "./login";

export interface DefaultApiResponse<T> {
  api_version: string;
  status: string;
  message: string;
  request_time?: number;
  url_query?: string;
  data: T;
  count?: number;
  pagination?: {
    current_number: number;
    digit_link: {
      number: number;
      url: string;
    }[];
    next: string;
    previous: string;
  },
  token?: string;
  lsp?: LspLoginResponse[];
  additional?: any;
}