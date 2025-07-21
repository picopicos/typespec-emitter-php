import { type Diagnostic, resolvePath } from '@typespec/compiler';
import {
  createTestHost,
  createTestLibrary,
  createTestWrapper,
  expectDiagnosticEmpty,
  findTestPackageRoot,
  type TypeSpecTestLibrary,
} from '@typespec/compiler/testing';

export const TypespecEmitterPhpTestLibrary: TypeSpecTestLibrary = createTestLibrary({
  name: '@picopico/typespec-emitter-php',
  packageRoot: await findTestPackageRoot(import.meta.url),
});

export const createTypespecEmitterPhpTestHost = async () => {
  return createTestHost({
    libraries: [TypespecEmitterPhpTestLibrary],
  });
};

export const createTypespecEmitterPhpTestRunner = async () => {
  const host = await createTypespecEmitterPhpTestHost();

  return createTestWrapper(host, {
    compilerOptions: {
      noEmit: false,
      emit: ['@picopico/typespec-emitter-php'],
    },
  });
};

export const emitWithDiagnostics = async (code: string): Promise<[Record<string, string>, readonly Diagnostic[]]> => {
  const runner = await createTypespecEmitterPhpTestRunner();
  await runner.compileAndDiagnose(code, {
    outputDir: './tsp-output',
  });
  const emitterOutputDir = './tsp-output/@picopico/typespec-emitter-php';
  const files = await runner.program.host.readDir(emitterOutputDir);

  const result: Record<string, string> = {};
  for (const file of files) {
    result[file] = (await runner.program.host.readFile(resolvePath(emitterOutputDir, file))).text;
  }
  return [result, runner.program.diagnostics];
};

export const emit = async (code: string): Promise<Record<string, string>> => {
  const [result, diagnostics] = await emitWithDiagnostics(code);
  expectDiagnosticEmpty(diagnostics);
  return result;
};
