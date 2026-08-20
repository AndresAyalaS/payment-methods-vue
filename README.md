# Gestor de metodos de pago

Aplicacion SPA construida con Vue 3, TypeScript, Quasar Framework, Vue Router y Pinia.

No requiere backend: las operaciones asincronas se simulan con mocks, conservando la separacion de responsabilidades esperada para una API real.

## Requisitos

- Node.js `22.12` o superior. Se recomienda Node.js 24 LTS.
- npm 10 o superior.

## Instalacion y ejecucion

1. Clonar el repositorio y cambiar a la rama de entrega:

   ```bash
   git clone https://github.com/AndresAyalaS/payment-methods-vue.git
   cd payment-methods-vue
   git checkout feature/prueba-tecnica
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Iniciar el entorno local:

   ```bash
   npm run dev
   ```

4. Abrir la URL indicada por Quasar, normalmente `http://localhost:9000/`.

## Credenciales de prueba

| Campo      | Valor              |
| ---------- | ------------------ |
| Correo     | `admin@linktic.co` |
| Contrasena | `Linktic2026`      |

## Funcionalidades implementadas

### Autenticacion y seguridad

- Inicio de sesion mediante credenciales mock.
- Persistencia de la sesion actual en `sessionStorage`.
- Guards globales: las rutas privadas redireccionan a `/login` cuando no existe una sesion activa.
- Redireccion de usuarios autenticados que intentan volver al login.
- Cierre de sesion visible en la cabecera de la aplicacion.

### Gestion de metodos de pago

- Listado con nombre, tipo, estado y fecha de creacion.
- Filtros por nombre, tipo y estado.
- Activacion o desactivacion inmediata con un switch.
- Creacion y edicion con un unico formulario reutilizable.
- Eliminacion con confirmacion explicita.
- Estados de carga y mensajes de error provistos por el store.

### Filtros reutilizables

`DynamicFilters` recibe una lista de definiciones de campo mediante props. El componente renderiza campos de texto o selectores, administra sus valores y emite:

- `search`: objeto con solo los campos que contienen informacion.
- `clear`: notificacion despues de restablecer todos los campos.

Los campos marcados como obligatorios usan las reglas de validacion de Quasar antes de ejecutar la busqueda. El componente no conoce el dominio de metodos de pago.

## Arquitectura

```text
src/
├── components/             # Componentes reutilizables y de interfaz
├── composables/            # Adaptadores de estado para la UI
├── constants/              # Opciones compartidas del dominio
├── layouts/                # Layouts publico y privado
├── pages/                  # Vistas y formulario de metodos de pago
├── router/                 # Rutas y guards de navegacion
├── services/               # Mocks asincronos centralizados
├── stores/                 # Estado global y acciones Pinia
└── types/                  # Contratos TypeScript del dominio y filtros
```

### Flujo de datos

1. La vista invoca una accion del store.
2. El store llama al servicio mock asincrono.
3. El servicio devuelve datos tipados o un error.
4. El store actualiza el estado global: items, carga y mensaje de error.
5. Los componentes reaccionan al estado sin contener logica de acceso a datos.

Los mocks se concentran en `src/services/auth.mock.ts` y `src/services/payment-method.mock.ts`; los componentes visuales no simulan llamadas ni mutan el origen de datos directamente.

## Modelo y supuestos

Un metodo de pago usa el siguiente contrato:

```ts
interface PaymentMethod {
  id: string;
  name: string;
  type: 'Tarjeta de credito' | 'Transferencia bancaria' | 'Billetera digital';
  description: string;
  isActive: boolean;
  createdAt: string;
}
```

- `id` se genera con `crypto.randomUUID()` al crear un registro.
- `createdAt` se guarda como fecha ISO y se presenta con formato `es-CO`.
- Los registros creados se activan por defecto.
- La descripcion es opcional; nombre y tipo son obligatorios.
- Los datos mock se mantienen en memoria. Se restauran a los datos iniciales cuando se recarga el navegador.
- Las operaciones mock incluyen un retraso corto para representar una llamada asíncrona y permitir verificar los estados de carga.
- No se agregaron librerias de UI, validacion o estado adicionales: Quasar aporta los componentes y validaciones, y Pinia centraliza el estado.

## Validacion tecnica

```bash
npm run typecheck
npm run lint:check
npm run build
```

Estos comandos verifican los contratos de Vue y TypeScript, las reglas de formato y lint, y la compilacion de produccion en `dist/spa`.
