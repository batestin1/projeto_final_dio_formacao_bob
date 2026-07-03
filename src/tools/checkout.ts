/**
 * Tool: git_checkout
 * Faz checkout de uma branch
 */

import { repositoryManager } from '../services/repository-manager.js';
import { validateInput, gitCheckoutSchema } from '../utils/validator.js';
import { log } from '../utils/logger.js';
import { ToolResult } from '../types/index.js';

export const gitCheckoutTool = {
  name: 'git_checkout',
  description: 'Faz checkout de uma branch',
  inputSchema: {
    type: 'object',
    properties: {
      repository_path: {
        type: 'string',
        description: 'Caminho do repositório local'
      },
      branch: {
        type: 'string',
        description: 'Nome da branch'
      },
      create: {
        type: 'boolean',
        description: 'Criar a branch se não existir (opcional)'
      }
    },
    required: ['repository_path', 'branch']
  }
};

export async function executeGitCheckout(args: any): Promise<ToolResult> {
  try {
    // Validar inputs
    const validated = validateInput(gitCheckoutSchema, {
      path: args.repository_path,
      branch: args.branch,
      create: args.create || false
    });

    log.info(`Executando git_checkout: ${validated.path} -> ${validated.branch}`);

    // Obter repositório
    const executor = await repositoryManager.getRepository(validated.path);
    await executor.checkout(validated.branch, validated.create);

    return {
      success: true,
      message: `Checkout para '${validated.branch}' realizado com sucesso`,
      data: {
        branch: validated.branch,
        created: validated.create
      }
    };
  } catch (error) {
    log.error('Erro ao executar git_checkout', error);
    return {
      success: false,
      message: 'Falha ao fazer checkout',
      error: error instanceof Error ? {
        type: 'UNKNOWN_ERROR' as any,
        message: error.message,
        recoverable: false
      } : undefined
    };
  }
}

// Made with Bob
