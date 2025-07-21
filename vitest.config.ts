import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

/**
 * Default Config For all TypeSpec projects using vitest.
 */
export default defineConfig({
  test: {
    environment: 'node',
    isolate: false,
    coverage: {
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.ts'],
    },
    include: ['e2e/**/*.test.ts', 'src/**/*.test.ts'],
  },
  esbuild: {
    target: 'node22',
  },
  resolve: {
    extensions: ['.ts', '.js', '.mjs', '.json'],
    alias: {
      '@picopico/typespec-emitter-php': resolve(__dirname, './src/index.ts'),
    },
  },
  server: {
    watch: {
      ignored: [],
    },
  },
});
