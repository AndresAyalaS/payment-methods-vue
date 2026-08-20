import type { PaymentMethodType } from '@/types/payment-method';

export const PAYMENT_METHOD_TYPES: PaymentMethodType[] = [
  'Tarjeta de credito',
  'Transferencia bancaria',
  'Billetera digital',
];

export const PAYMENT_METHOD_TYPE_OPTIONS = PAYMENT_METHOD_TYPES.map((type) => ({
  label: type,
  value: type,
}));

export const STATUS_OPTIONS = [
  { label: 'Activo', value: true },
  { label: 'Inactivo', value: false },
];
