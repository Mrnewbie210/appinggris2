/// <reference types="vite/client" />

/**
 * Augments Vite's ImportMetaEnv with app-specific env variables.
 * All VITE_ prefixed vars are exposed to the client bundle.
 */
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
