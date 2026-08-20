import type {
  PaymentMethod,
  PaymentMethodFilters,
  PaymentMethodInput,
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

export async function createPaymentMethodMock(payload: PaymentMethodInput): Promise<PaymentMethod> {
  await wait();
  const paymentMethod: PaymentMethod = {
    id: crypto.randomUUID(),
    ...payload,
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  paymentMethods = [paymentMethod, ...paymentMethods];
  return clone(paymentMethod);
}

export async function updatePaymentMethodMock(
  id: string,
  payload: PaymentMethodInput,
): Promise<PaymentMethod> {
  await wait();
  const index = paymentMethods.findIndex((method) => method.id === id);
  if (index === -1) throw new Error('No se encontro el metodo de pago seleccionado.');

  const currentPaymentMethod = paymentMethods[index];
  if (!currentPaymentMethod) throw new Error('No se encontro el metodo de pago seleccionado.');

  const updatedPaymentMethod = { ...currentPaymentMethod, ...payload };
  paymentMethods[index] = updatedPaymentMethod;
  return clone(updatedPaymentMethod);
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

export async function deletePaymentMethodMock(id: string): Promise<void> {
  await wait();
  const exists = paymentMethods.some((method) => method.id === id);
  if (!exists) throw new Error('No se encontro el metodo de pago seleccionado.');

  paymentMethods = paymentMethods.filter((method) => method.id !== id);
}
