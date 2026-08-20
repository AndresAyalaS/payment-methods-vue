import type { AuthUser, LoginCredentials } from '@/types/auth';

const DEMO_CREDENTIALS: LoginCredentials = {
  email: 'admin@linktic.co',
  password: 'Linktic2026',
};

const DEMO_USER: AuthUser = {
  id: 'usr-001',
  name: 'Administrador',
  email: DEMO_CREDENTIALS.email,
};

function wait() {
  return new Promise((resolve) => window.setTimeout(resolve, 450));
}

export async function loginMock(credentials: LoginCredentials): Promise<AuthUser> {
  await wait();

  if (
    credentials.email !== DEMO_CREDENTIALS.email ||
    credentials.password !== DEMO_CREDENTIALS.password
  ) {
    throw new Error('Las credenciales ingresadas no son validas.');
  }

  return DEMO_USER;
}
