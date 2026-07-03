/**
 * Tool: git_push
 * Envia commits para o repositório remoto
 */

import { repositoryManager } from '../services/repository-manager.js';
import { validateInput, gitPushSchema } from '../utils/validator.js';
import { log } from '../utils/logger.js';
import { ToolResult } from '../types/index.js';

export const gitPushTool = {
  name: 'git_push',
  description: 'Envia commits para o repositório remoto',
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
        description: 'Branch para push (opcional, usa branch atual)'
      },
      force: {
        type: 'boolean',
        description: 'Force push (opcional, use com cuidado)'
      }
    },
    required: ['repository_path']
  }
};

export async function executeGitPush(args: any): Promise<ToolResult> {
  try {
    // Validar inputs
    const validated = validateInput(gitPushSchema, {
      path: args.repository_path,
      remote: args.remote || 'origin',
      branch: args.branch,
      force: args.force || false
    });

    log.info(`Executando git_push: ${validated.path}`);

    // Obter repositório
    const executor = await repositoryManager.getRepository(validated.path);
    await executor.push(validated.remote, validated.branch, validated.force);

    return {
      success: true,
      message: `Push realizado com sucesso para ${validated.remote}`,
      data: {
        remote: validated.remote,
        branch: validated.branch || 'current',
        force: validated.force
      }
    };
  } catch (error) {
    log.error('Erro ao executar git_push', error);
    return {
      success: false,
      message: 'Falha ao fazer push',
      error: error instanceof Error ? {
        type: 'UNKNOWN_ERROR' as any,
        message: error.message,
        recoverable: false
      } : undefined
    };
  }
}

// Made with Bob
