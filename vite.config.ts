import { defineConfig } from 'vite'

import { default as vitestConfig } from './vitest.config'

// https://vite.dev/config/
export default defineConfig({
  ...vitestConfig,
  // Remove test config for production build
  test: undefined,
})
