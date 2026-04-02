/// <reference types="vite/client" />

declare module "@glidejs/glide" {
  export default class Glide {
    constructor(selector: string, options?: Record<string, unknown>);
    mount(): this;
    destroy(): void;
  }
}
