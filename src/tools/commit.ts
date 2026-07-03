/**
 * Tool: git_commit
 * Cria um commit com as mudanças
 */

import { repositoryManager } from '../services/repository-manager.js';
import { validateInput, gitCommitSchema } from '../utils/validator.js';
import { log } from '../utils/logger.js';
import { ToolResult } from '../types/index.js';

export const gitCommitTool = {
  name: 'git_commit',
  description: 'Cria um commit com as mudanças staged',
  inputSchema: {
    type: 'object',
    properties: {
      repository_path: {
        type: 'string',
        description: 'Caminho do repositório local'
      },
      message: {
        type: 'string',
        description: 'Mensagem do commit'
      },
      files: {
        type: 'array',
        items: { type: 'string' },
        description: 'Arquivos específicos para adicionar (opcional, default: todos)'
      }
    },
    required: ['repository_path', 'message']
  }
};

export async function executeGitCommit(args: any): Promise<ToolResult> {
  try {
    // Validar inputs
    const validated = validateInput(gitCommitSchema, {
      path: args.repository_path,
      message: args.message,
      files: args.files
    });

    log.info(`Executando git_commit: ${validated.path}`);

    // Obter repositório
    const executor = await repositoryManager.getRepository(validated.path);
    const commitHash = await executor.commit(validated.message, validated.files);

    return {
      success: true,
      message: `Commit criado com sucesso: ${commitHash.substring(0, 7)}`,
      data: {
        hash: commitHash,
        message: validated.message,
        files: validated.files || ['all']
      }
    };
  } catch (error) {
    log.error('Erro ao executar git_commit', error);
    return {
      success: false,
      message: 'Falha ao criar commit',
      error: error instanceof Error ? {
        type: 'UNKNOWN_ERROR' as any,
        message: error.message,
        recoverable: false
      } : undefined
    };
  }
}

// Made with Bob
