/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_FORMSPREE_FORM_ID?: string;
  readonly VITE_CONTACT_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "@glidejs/glide" {
  export default class Glide {
    constructor(selector: string | HTMLElement, options?: Record<string, unknown>);
    mount(): this;
    destroy(): void;
  }
}
