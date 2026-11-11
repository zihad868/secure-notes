import { Request } from "express";

export interface Pagination {
  page: number;
  limit: number;
  skip: number;
}

export const getPagination = (req: Request): Pagination => {
  const page = Math.max(Number.parseInt(String(req.query.page ?? "1"), 10) || 1, 1);
  const limit = Math.min(
    Math.max(Number.parseInt(String(req.query.limit ?? "10"), 10) || 10, 1),
    100
  );

  return { page, limit, skip: (page - 1) * limit };
};

export const getPaginationMeta = (page: number, limit: number, total: number) => ({
  page,
  limit,
  total,
});
