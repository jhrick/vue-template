import { createToast } from '@/utils/creator';
import { defineStore } from 'pinia';

export type ToastStatus = 'success' | 'warning' | 'error';

export interface Toast {
  id: number;
  title: string;
  description: string;
  status: ToastStatus;
}

type ToastPayload = { timeout?: number; title: string; description: string };

const defaultTimeout = 2000;

export const useToasterStore = defineStore('toaster', {
  state: (): { toasts: Toast[] } => ({
    toasts: [],
  }),
  actions: {
    updateState(payload: ToastPayload, status: ToastStatus) {
      const { timeout, title, description } = payload;

      const toast = createToast(title, description, status);

      this.toasts.push(toast);

      setTimeout(() => {
        this.toasts = this.toasts.filter(t => t.id !== toast.id);
      }, timeout ?? defaultTimeout);
    },
    success(payload: ToastPayload) {
      this.updateState(payload, 'success');
    },

    warning(payload: ToastPayload) {
      this.updateState(payload, 'warning');
    },

    error(payload: ToastPayload) {
      this.updateState(payload, 'error');
    },
  },
});
