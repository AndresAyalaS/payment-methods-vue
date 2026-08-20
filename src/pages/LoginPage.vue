<template>
  <q-page class="row items-center justify-center q-pa-md">
    <q-card flat bordered class="login-card q-pa-lg">
      <q-card-section class="q-px-none">
        <div class="text-h5 text-weight-bold">Bienvenido</div>
        <div class="text-body2 text-grey-7 q-mt-xs">
          Inicia sesion para administrar los metodos de pago.
        </div>
      </q-card-section>
      <q-form class="q-gutter-md" @submit="submit">
        <q-input
          v-model="credentials.email"
          outlined
          label="Correo electronico"
          type="email"
          :rules="[requiredRule]"
        />
        <q-input
          v-model="credentials.password"
          outlined
          label="Contrasena"
          type="password"
          :rules="[requiredRule]"
        />
        <q-banner v-if="errorMessage" rounded class="bg-red-1 text-negative">{{
          errorMessage
        }}</q-banner>
        <q-btn
          type="submit"
          color="primary"
          class="full-width"
          label="Ingresar"
          no-caps
          :loading="isLoading"
        />
      </q-form>
      <q-separator class="q-my-lg" />
      <div class="text-caption text-grey-7">Demo: admin@linktic.co / Linktic2026</div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const route = useRoute();
const { authStore, isLoading, errorMessage } = useAuth();
const credentials = reactive({ email: '', password: '' });
const requiredRule = (value: string) => Boolean(value) || 'Este campo es requerido.';

async function submit() {
  try {
    await authStore.login(credentials);
    const redirect =
      typeof route.query.redirect === 'string' ? route.query.redirect : '/payment-methods';
    await router.replace(redirect);
  } catch {
    // The store supplies the visual error state.
  }
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 420px;
  border-radius: 8px;
}
</style>
