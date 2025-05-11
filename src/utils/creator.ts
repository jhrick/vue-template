import type { ToastStatus } from '@/stores/toaster';

export const createToast = (
  title: string,
  description: string,
  status: ToastStatus,
) => ({
  id: Math.random() * 1000,
  title,
  description,
  status,
});
