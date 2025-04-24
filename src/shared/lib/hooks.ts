import { useEffect, useState, useCallback } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { toast, ToastOptions, TypeOptions } from 'react-toastify';
import { AppDispatch, RootState } from '@app/store';

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
};

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  theme: 'light',
};

type ShowToast = (message: string, type?: TypeOptions, options?: ToastOptions) => void;

export const useToast = () => {
  const showToast: ShowToast = useCallback((message, type = 'default', options = {}) => {
    toast(message, {
      ...defaultOptions,
      type,
      ...options,
    });
  }, []);

  const success = useCallback(
    (msg: string, opts?: ToastOptions) => showToast(msg, 'success', opts),
    [showToast],
  );
  const error = useCallback(
    (msg: string, opts?: ToastOptions) => showToast(msg, 'error', opts),
    [showToast],
  );
  const info = useCallback(
    (msg: string, opts?: ToastOptions) => showToast(msg, 'info', opts),
    [showToast],
  );
  const warning = useCallback(
    (msg: string, opts?: ToastOptions) => showToast(msg, 'warning', opts),
    [showToast],
  );

  return { showToast, success, error, info, warning };
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
