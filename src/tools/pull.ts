/**
 * Tool: git_pull
 * Busca e integra mudanças do repositório remoto
 */

import { repositoryManager } from '../services/repository-manager.js';
import { validateInput, gitPullSchema } from '../utils/validator.js';
import { log } from '../utils/logger.js';
import { ToolResult } from '../types/index.js';

export const gitPullTool = {
  name: 'git_pull',
  description: 'Busca e integra mudanças do repositório remoto',
  inputSchema: {
    type: 'object',
    properties: {
      repository_path: {
        type: 'string',
        description: 'Caminho do repositório local'
      },
      remote: {
        type: 'string',
        description: 'Nome do remote (default: origin)'
      },
      branch: {
        type: 'string',
        description: 'Branch para pull (opcional, usa branch atual)'
      }
    },
    required: ['repository_path']
  }
};

export async function executeGitPull(args: any): Promise<ToolResult> {
  try {
    // Validar inputs
    const validated = validateInput(gitPullSchema, {
      path: args.repository_path,
      remote: args.remote || 'origin',
      branch: args.branch
    });

    log.info(`Executando git_pull: ${validated.path}`);

    // Obter repositório
    const executor = await repositoryManager.getRepository(validated.path);
    await executor.pull(validated.remote, validated.branch);

    return {
      success: true,
      message: `Pull realizado com sucesso de ${validated.remote}`,
      data: {
        remote: validated.remote,
        branch: validated.branch || 'current'
      }
    };
  } catch (error) {
    log.error('Erro ao executar git_pull', error);
    return {
      success: false,
      message: 'Falha ao fazer pull',
      error: error instanceof Error ? {
        type: 'UNKNOWN_ERROR' as any,
        message: error.message,
        recoverable: false
      } : undefined
    };
  }
}

// Made with Bob
