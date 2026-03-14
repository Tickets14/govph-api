import { Response } from 'express';
import { HTTP_STATUS } from '../constants/common';
import { ApiResponse, PaginatedResponse } from '../types/common.types';

export function sendSuccess<T>(res: Response, data: T, message?: string, statusCode: number = HTTP_STATUS.OK): void {
  const response: ApiResponse<T> = { success: true, data, message };
  res.status(statusCode).json(response);
}

export function sendCreated<T>(res: Response, data: T, message?: string): void {
  sendSuccess(res, data, message, HTTP_STATUS.CREATED);
}

export function sendPaginated<T>(res: Response, result: PaginatedResponse<T>): void {
  res.status(HTTP_STATUS.OK).json({ success: true, ...result });
}

export function sendNoContent(res: Response): void {
  res.status(HTTP_STATUS.NO_CONTENT).send();
}
