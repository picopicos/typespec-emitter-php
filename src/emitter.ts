import { type EmitContext, emitFile, resolvePath } from '@typespec/compiler';

/**
 * Entrypoint of the emitter.
 */
export async function $onEmit(context: EmitContext) {
  await emitFile(context.program, {
    path: resolvePath(context.emitterOutputDir, 'output.txt'),
    content: 'Hello world\n',
  });
}
