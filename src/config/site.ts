// Configuração única do site (landing RF17): trocar o nome aqui atualiza todas as páginas.

function env(value: string | undefined): string | null {
  const v = value?.trim();
  return v ? v : null;
}

export const SITE = {
  name: "Kilu",
  tagline: "Descubra em 1 minuto se sua empresa paga luz demais",
  appUrl: env(import.meta.env.PUBLIC_APP_URL) ?? "http://localhost:3000",
  apiUrl: env(import.meta.env.PUBLIC_API_URL) ?? "http://localhost:8080",
  controller: {
    legalName: env(import.meta.env.PUBLIC_CONTROLLER_NAME),
    cnpj: env(import.meta.env.PUBLIC_CONTROLLER_CNPJ),
    privacyEmail: env(import.meta.env.PUBLIC_PRIVACY_EMAIL),
  },
  legal: { version: "v1-provisorio", updatedAt: "2026-11-18", provisional: true },
} as const;

export const TO_BE_DEFINED = "a definir";

/** Link para o sistema; `ref` é acrescentado pelo script da página quando houver indicação. */
export function appLink(path: string): string {
  return `${SITE.appUrl}${path}`;
}
