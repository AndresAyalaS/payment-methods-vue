import { defineStore } from 'pinia';
import {
  createPaymentMethodMock,
  deletePaymentMethodMock,
  getPaymentMethodsMock,
  updatePaymentMethodMock,
  updatePaymentMethodStatusMock,
} from '@/services/payment-method.mock';
import type {
  PaymentMethod,
  PaymentMethodFilters,
  PaymentMethodInput,
} from '@/types/payment-method';

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

    async create(payload: PaymentMethodInput) {
      return this.runMutation(
        () => createPaymentMethodMock(payload),
        (paymentMethod) => {
          this.items.unshift(paymentMethod);
        },
      );
    },

    async update(id: string, payload: PaymentMethodInput) {
      return this.runMutation(
        () => updatePaymentMethodMock(id, payload),
        (paymentMethod) => {
          this.replaceItem(paymentMethod);
        },
      );
    },

    async updateStatus(id: string, isActive: boolean) {
      return this.runMutation(
        () => updatePaymentMethodStatusMock(id, isActive),
        (paymentMethod) => {
          this.replaceItem(paymentMethod);
        },
      );
    },

    async remove(id: string) {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        await deletePaymentMethodMock(id);
        this.items = this.items.filter((item) => item.id !== id);
      } catch (error) {
        this.errorMessage =
          error instanceof Error ? error.message : 'No fue posible eliminar el metodo de pago.';
      } finally {
        this.isLoading = false;
      }
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
