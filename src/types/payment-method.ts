export type PaymentMethodType =
  'Tarjeta de credito' | 'Transferencia bancaria' | 'Billetera digital';

export interface PaymentMethod {
  id: string;
  name: string;
  type: PaymentMethodType;
  description: string;
  isActive: boolean;
  createdAt: string;
}

export type PaymentMethodInput = Pick<PaymentMethod, 'name' | 'type' | 'description'>;

export interface PaymentMethodFilters {
  name?: string;
  type?: PaymentMethodType;
  isActive?: boolean;
}
