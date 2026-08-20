<template>
  <q-form class="row q-col-gutter-md items-end" @submit="submit">
    <div v-for="field in fields" :key="field.key" class="col-12 col-sm-4">
      <q-input
        v-if="field.type === 'text'"
        :model-value="getTextValue(field.key)"
        outlined
        dense
        :label="field.label"
        :rules="field.required ? [requiredRule] : []"
        @update:model-value="(value) => setValue(field.key, value)"
      />
      <q-select
        v-else
        v-model="values[field.key]"
        outlined
        dense
        clearable
        emit-value
        map-options
        :label="field.label"
        :options="field.options"
        :rules="field.required ? [requiredRule] : []"
      />
    </div>
    <div class="col-12 col-sm-auto row q-gutter-sm">
      <q-btn type="submit" color="primary" label="Buscar" no-caps />
      <q-btn flat color="primary" label="Limpiar" no-caps @click="clear" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { FilterField, FilterValues } from '@/types/filters';

const props = defineProps<{ fields: FilterField[] }>();
const emit = defineEmits<{ search: [values: FilterValues]; clear: [] }>();
const values = reactive<FilterValues>({});
const requiredRule = (value: unknown) =>
  (value !== undefined && value !== null && value !== '') || 'Este campo es requerido.';

watch(
  () => props.fields,
  (fields) => {
    fields.forEach((field) => {
      if (!(field.key in values)) values[field.key] = undefined;
    });
  },
  { immediate: true },
);

function submit() {
  const populatedValues = Object.fromEntries(
    Object.entries(values).filter(
      ([, value]) => value !== undefined && value !== null && value !== '',
    ),
  );
  emit('search', populatedValues);
}

function getTextValue(key: string): string {
  const value = values[key];
  return typeof value === 'string' ? value : '';
}

function setValue(key: string, value: string | boolean | number | null | undefined) {
  values[key] = value === null || value === undefined ? undefined : String(value);
}

function clear() {
  props.fields.forEach((field) => {
    values[field.key] = undefined;
  });
  emit('clear');
}
</script>
