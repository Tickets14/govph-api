import { PAGINATION } from '../constants/common';

export function parsePagination(query: { page?: unknown; limit?: unknown }): {
  page: number;
  limit: number;
  offset: number;
} {
  const page = Math.max(1, Number(query.page) || PAGINATION.DEFAULT_PAGE);
  const limit = Math.min(PAGINATION.MAX_LIMIT, Number(query.limit) || PAGINATION.DEFAULT_LIMIT);
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}
