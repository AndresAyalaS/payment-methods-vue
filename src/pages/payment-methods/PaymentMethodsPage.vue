<template>
  <q-page class="q-pa-md q-pa-lg-lg">
    <div class="row items-center justify-between q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm">
        <h1 class="text-h5 text-weight-bold q-my-none">Metodos de pago</h1>
        <p class="text-grey-7 q-mb-none">Consulta y administra los canales registrados.</p>
      </div>
    </div>
    <q-card flat bordered class="q-mb-lg"
      ><q-card-section
        ><DynamicFilters
          :fields="filterFields"
          @search="search"
          @clear="clearFilters" /></q-card-section
    ></q-card>
    <q-banner
      v-if="paymentMethodStore.errorMessage"
      rounded
      class="bg-red-1 text-negative q-mb-md"
      >{{ paymentMethodStore.errorMessage }}</q-banner
    >
    <q-table
      flat
      bordered
      row-key="id"
      :rows="paymentMethodStore.items"
      :columns="columns"
      :loading="paymentMethodStore.isLoading"
      no-data-label="No hay metodos de pago para mostrar."
    >
      <template #body-cell-isActive="props"
        ><q-td :props="props"
          ><q-toggle
            :model-value="props.row.isActive"
            color="positive"
            @update:model-value="updateStatus(props.row, $event)" /></q-td
      ></template>
      <template #body-cell-createdAt="props"
        ><q-td :props="props">{{ formatDate(props.row.createdAt) }}</q-td></template
      >
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { QTableColumn } from 'quasar';
import DynamicFilters from '@/components/DynamicFilters.vue';
import { PAYMENT_METHOD_TYPE_OPTIONS, STATUS_OPTIONS } from '@/constants/payment-method';
import { usePaymentMethodStore } from '@/stores/payment-method.store';
import type { FilterField, FilterValues } from '@/types/filters';
import type { PaymentMethod } from '@/types/payment-method';

const paymentMethodStore = usePaymentMethodStore();
const filterFields: FilterField[] = [
  { key: 'name', label: 'Nombre', type: 'text' },
  { key: 'type', label: 'Tipo', type: 'select', options: PAYMENT_METHOD_TYPE_OPTIONS },
  { key: 'isActive', label: 'Estado', type: 'select', options: STATUS_OPTIONS },
];
const columns: QTableColumn[] = [
  { name: 'name', label: 'Nombre', field: 'name', align: 'left', sortable: true },
  { name: 'type', label: 'Tipo', field: 'type', align: 'left', sortable: true },
  { name: 'isActive', label: 'Estado', field: 'isActive', align: 'center' },
  {
    name: 'createdAt',
    label: 'Fecha de creacion',
    field: 'createdAt',
    align: 'left',
    sortable: true,
  },
];

onMounted(() => void paymentMethodStore.fetchAll());
function search(values: FilterValues) {
  void paymentMethodStore.fetchAll(values);
}
function clearFilters() {
  void paymentMethodStore.fetchAll();
}
function updateStatus(paymentMethod: PaymentMethod, isActive: boolean) {
  void paymentMethodStore.updateStatus(paymentMethod.id, isActive);
}
function formatDate(value: string) {
  return new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium' }).format(new Date(value));
}
</script>
