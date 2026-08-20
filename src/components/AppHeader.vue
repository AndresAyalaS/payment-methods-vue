<template>
  <q-header bordered class="bg-white text-grey-9">
    <q-toolbar class="q-px-md">
      <q-icon name="account_balance_wallet" color="primary" size="28px" class="q-mr-sm" />
      <q-toolbar-title class="text-weight-bold">Gestor de métodos de pago</q-toolbar-title>
      <div class="gt-xs text-body2 q-mr-md">{{ user?.name }}</div>
      <q-btn flat round icon="logout" aria-label="Cerrar sesion" @click="logout">
        <q-tooltip>Cerrar sesion</q-tooltip>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { authStore, user } = useAuth();

function logout() {
  authStore.logout();
  void router.replace({ name: 'login' });
}
</script>
