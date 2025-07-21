import { createTypeSpecLibrary } from '@typespec/compiler';

/**
 * Library definitions like diagnostics, configuration, etc.
 */
export const $lib = createTypeSpecLibrary({
  name: '@picopico/typespec-emitter-php',
  diagnostics: {},
});

export const { reportDiagnostic, createDiagnostic } = $lib;
