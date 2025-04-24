import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { IErrorData } from '@shared/model/schema';

export function getApiErrorMessage(error: unknown, fallback = 'Something went wrong') {
  let message = fallback;

  if (error && typeof error === 'object' && 'status' in error && 'data' in error) {
    const err = error as FetchBaseQueryError;
    const data = err.data as Partial<IErrorData>;
    if (data?.error) message = data.error;
  }

  console.error(error);

  return message;
}
