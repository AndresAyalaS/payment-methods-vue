import type {
  PaymentMethod,
  PaymentMethodFilters,
} from '@/types/payment-method';

let paymentMethods: PaymentMethod[] = [
  {
    id: 'pm-001',
    name: 'Visa corporativa',
    type: 'Tarjeta de credito',
    description: 'Pagos empresariales nacionales.',
    isActive: true,
    createdAt: '2026-08-12T14:30:00.000Z',
  },
  {
    id: 'pm-002',
    name: 'Cuenta Bancolombia',
    type: 'Transferencia bancaria',
    description: 'Cuenta principal de recaudo.',
    isActive: true,
    createdAt: '2026-08-09T09:15:00.000Z',
  },
  {
    id: 'pm-003',
    name: 'Nequi',
    type: 'Billetera digital',
    description: 'Canal para pagos de bajo monto.',
    isActive: false,
    createdAt: '2026-08-03T16:45:00.000Z',
  },
];

function wait() {
  return new Promise((resolve) => window.setTimeout(resolve, 400));
}

function clone(method: PaymentMethod): PaymentMethod {
  return { ...method };
}

export async function getPaymentMethodsMock(
  filters: PaymentMethodFilters = {},
): Promise<PaymentMethod[]> {
  await wait();
  const normalizedName = filters.name?.trim().toLowerCase();

  return paymentMethods
    .filter((method) => !normalizedName || method.name.toLowerCase().includes(normalizedName))
    .filter((method) => !filters.type || method.type === filters.type)
    .filter((method) => filters.isActive === undefined || method.isActive === filters.isActive)
    .map(clone);
}

export async function updatePaymentMethodStatusMock(
  id: string,
  isActive: boolean,
): Promise<PaymentMethod> {
  await wait();
  const method = paymentMethods.find((item) => item.id === id);
  if (!method) throw new Error('No se encontro el metodo de pago seleccionado.');

  method.isActive = isActive;
  return clone(method);
}
