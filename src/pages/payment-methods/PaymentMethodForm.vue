<template>
  <q-dialog
    :model-value="modelValue"
    persistent
    @update:model-value="emit('update:modelValue', $event)"
  >
    <q-card class="form-dialog">
      <q-card-section class="row items-center"
        ><div class="text-h6">
          {{ paymentMethod ? 'Editar metodo de pago' : 'Nuevo metodo de pago' }}
        </div>
        <q-space /><q-btn
          flat
          round
          icon="close"
          aria-label="Cerrar"
          @click="emit('update:modelValue', false)"
      /></q-card-section>
      <q-form @submit="save">
        <q-card-section class="q-gutter-md">
          <q-input v-model="form.name" outlined label="Nombre" :rules="[requiredRule]" />
          <q-select
            v-model="form.type"
            outlined
            emit-value
            map-options
            label="Tipo"
            :options="typeOptions"
            :rules="[requiredRule]"
          />
          <q-input
            v-model="form.description"
            outlined
            type="textarea"
            label="Descripcion"
            autogrow
          />
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md"
          ><q-btn flat label="Cancelar" no-caps @click="emit('update:modelValue', false)" /><q-btn
            type="submit"
            color="primary"
            label="Guardar"
            no-caps
            :loading="isSaving"
        /></q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { PAYMENT_METHOD_TYPE_OPTIONS } from '@/constants/payment-method';
import type { PaymentMethod, PaymentMethodInput, PaymentMethodType } from '@/types/payment-method';

const props = defineProps<{
  modelValue: boolean;
  paymentMethod: PaymentMethod | null;
  isSaving: boolean;
}>();
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  save: [payload: PaymentMethodInput];
}>();
const typeOptions = PAYMENT_METHOD_TYPE_OPTIONS;
const form = reactive<{ name: string; type: PaymentMethodType | undefined; description: string }>({
  name: '',
  type: undefined,
  description: '',
});
const requiredRule = (value: string | undefined) => Boolean(value) || 'Este campo es requerido.';

watch(
  () => [props.modelValue, props.paymentMethod] as const,
  () => {
    form.name = props.paymentMethod?.name ?? '';
    form.type = props.paymentMethod?.type;
    form.description = props.paymentMethod?.description ?? '';
  },
  { immediate: true },
);

function save() {
  if (form.type)
    emit('save', { name: form.name.trim(), type: form.type, description: form.description.trim() });
}
</script>

<style scoped>
.form-dialog {
  width: 100%;
  max-width: 560px;
}
</style>
