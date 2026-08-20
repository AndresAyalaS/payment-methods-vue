import { defineStore } from 'pinia';
import {
  getPaymentMethodsMock,
  updatePaymentMethodStatusMock,
} from '@/services/payment-method.mock';
import type { PaymentMethod, PaymentMethodFilters } from '@/types/payment-method';

export const usePaymentMethodStore = defineStore('payment-methods', {
  state: () => ({
    items: [] as PaymentMethod[],
    isLoading: false,
    errorMessage: '',
  }),

  actions: {
    async fetchAll(filters: PaymentMethodFilters = {}) {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        this.items = await getPaymentMethodsMock(filters);
      } catch (error) {
        this.errorMessage =
          error instanceof Error ? error.message : 'No fue posible cargar los metodos de pago.';
      } finally {
        this.isLoading = false;
      }
    },

    async updateStatus(id: string, isActive: boolean) {
      return this.runMutation(
        () => updatePaymentMethodStatusMock(id, isActive),
        (paymentMethod) => {
          this.replaceItem(paymentMethod);
        },
      );
    },

    replaceItem(paymentMethod: PaymentMethod) {
      const index = this.items.findIndex((item) => item.id === paymentMethod.id);
      if (index !== -1) this.items.splice(index, 1, paymentMethod);
    },

    async runMutation(
      operation: () => Promise<PaymentMethod>,
      onSuccess: (paymentMethod: PaymentMethod) => void,
    ) {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        const paymentMethod = await operation();
        onSuccess(paymentMethod);
        return paymentMethod;
      } catch (error) {
        this.errorMessage =
          error instanceof Error ? error.message : 'No fue posible guardar el metodo de pago.';
        return undefined;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
