export type ApiError = {
  detail?: string | ApiValidationError[];
  message?: string;
};

export type ApiValidationError = {
  loc: string[];
  msg: string;
  type: string;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
};