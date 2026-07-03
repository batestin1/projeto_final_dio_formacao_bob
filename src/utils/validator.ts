/**
 * Validação de inputs usando Zod
 */

import { z } from 'zod';

// Schema para validação de URL do repositório
export const repositoryUrlSchema = z.string()
  .url()
  .refine(
    (url) => url.startsWith('https://github.com/') || url.startsWith('git@github.com:'),
    { message: 'URL deve ser do GitHub (https://github.com/ ou git@github.com:)' }
  );

// Schema para validação de path local
export const localPathSchema = z.string()
  .min(1, 'Path não pode ser vazio')
  .refine(
    (path) => !path.includes('..'),
    { message: 'Path não pode conter ..' }
  );

// Schema para validação de branch name
export const branchNameSchema = z.string()
  .min(1, 'Nome da branch não pode ser vazio')
  .regex(/^[a-zA-Z0-9/_-]+$/, 'Nome da branch contém caracteres inválidos');

// Schema para validação de commit message
export const commitMessageSchema = z.string()
  .min(1, 'Mensagem de commit não pode ser vazia')
  .max(500, 'Mensagem de commit muito longa (máximo 500 caracteres)');

// Schema para validação de GitHub PAT
export const githubPatSchema = z.string()
  .regex(/^ghp_[a-zA-Z0-9]{36}$/, 'Token do GitHub inválido (deve começar com ghp_)');

// Schema para git_clone
export const gitCloneSchema = z.object({
  url: repositoryUrlSchema,
  path: localPathSchema,
  branch: branchNameSchema.optional()
});

// Schema para git_commit
export const gitCommitSchema = z.object({
  path: localPathSchema,
  message: commitMessageSchema,
  files: z.array(z.string()).optional()
});

// Schema para git_push
export const gitPushSchema = z.object({
  path: localPathSchema,
  remote: z.string().default('origin'),
  branch: branchNameSchema.optional(),
  force: z.boolean().default(false)
});

// Schema para git_pull
export const gitPullSchema = z.object({
  path: localPathSchema,
  remote: z.string().default('origin'),
  branch: branchNameSchema.optional()
});

// Schema para git_branch
export const gitBranchSchema = z.object({
  path: localPathSchema,
  action: z.enum(['list', 'create', 'delete']),
  name: branchNameSchema.optional()
});

// Schema para git_checkout
export const gitCheckoutSchema = z.object({
  path: localPathSchema,
  branch: branchNameSchema,
  create: z.boolean().default(false)
});

// Schema para git_status
export const gitStatusSchema = z.object({
  path: localPathSchema
});

/**
 * Valida um input usando um schema Zod
 */
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
      throw new Error(`Validação falhou:\n${messages.join('\n')}`);
    }
    throw error;
  }
}

/**
 * Sanitiza um path removendo caracteres perigosos
 */
export function sanitizePath(path: string): string {
  return path.replace(/\.\./g, '').replace(/[<>:"|?*]/g, '');
}

/**
 * Valida se um path existe e é um diretório Git
 */
export async function isGitRepository(path: string): Promise<boolean> {
  try {
    const fs = await import('fs/promises');
    const pathModule = await import('path');
    const gitPath = pathModule.join(path, '.git');
    const stat = await fs.stat(gitPath);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

// Made with Bob
