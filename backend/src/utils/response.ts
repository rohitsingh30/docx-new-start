import { Response } from 'express';

/**
 * Standard success response
 */
export const successResponse = (
  res: Response,
  data: any,
  statusCode: number = 200
) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

/**
 * Standard error response
 */
export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

/**
 * Paginated response
 */
export const paginatedResponse = (
  res: Response,
  data: any[],
  page: number,
  limit: number,
  total: number
) => {
  return res.status(200).json({
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
};
