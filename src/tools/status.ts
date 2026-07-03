/**
 * Tool: git_status
 * Verifica o status do repositório
 */

import { repositoryManager } from '../services/repository-manager.js';
import { validateInput, gitStatusSchema } from '../utils/validator.js';
import { log } from '../utils/logger.js';
import { ToolResult } from '../types/index.js';

export const gitStatusTool = {
  name: 'git_status',
  description: 'Verifica o status atual do repositório',
  inputSchema: {
    type: 'object',
    properties: {
      repository_path: {
        type: 'string',
        description: 'Caminho do repositório local'
      },
      verbose: {
        type: 'boolean',
        description: 'Mostrar informações detalhadas (opcional)'
      }
    },
    required: ['repository_path']
  }
};

export async function executeGitStatus(args: any): Promise<ToolResult> {
  try {
    // Validar inputs
    const validated = validateInput(gitStatusSchema, {
      path: args.repository_path
    });

    log.info(`Executando git_status: ${validated.path}`);

    // Obter repositório
    const executor = await repositoryManager.getRepository(validated.path);
    const status = await executor.status();

    // Formatar resultado
    const summary = [];
    if (status.isClean) {
      summary.push('✅ Working tree limpo');
    } else {
      if (status.modified.length > 0) {
        summary.push(`📝 ${status.modified.length} arquivo(s) modificado(s)`);
      }
      if (status.created.length > 0) {
        summary.push(`➕ ${status.created.length} arquivo(s) novo(s)`);
      }
      if (status.deleted.length > 0) {
        summary.push(`➖ ${status.deleted.length} arquivo(s) deletado(s)`);
      }
      if (status.staged.length > 0) {
        summary.push(`📦 ${status.staged.length} arquivo(s) staged`);
      }
      if (status.conflicted.length > 0) {
        summary.push(`⚠️ ${status.conflicted.length} conflito(s)`);
      }
    }

    if (status.ahead > 0) {
      summary.push(`⬆️ ${status.ahead} commit(s) à frente`);
    }
    if (status.behind > 0) {
      summary.push(`⬇️ ${status.behind} commit(s) atrás`);
    }

    return {
      success: true,
      message: `Branch: ${status.branch}\n${summary.join('\n')}`,
      data: status
    };
  } catch (error) {
    log.error('Erro ao executar git_status', error);
    return {
      success: false,
      message: 'Falha ao obter status do repositório',
      error: error instanceof Error ? {
        type: 'UNKNOWN_ERROR' as any,
        message: error.message,
        recoverable: false
      } : undefined
    };
  }
}

// Made with Bob
