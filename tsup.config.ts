/** biome-ignore-all lint/style/noProcessEnv: tsup.config.ts */
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/testing/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  target: 'node22',
  outDir: 'dist/src',
  sourcemap: true,
});
