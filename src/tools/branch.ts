/**
 * Tool: git_branch
 * Gerencia branches do repositório
 */

import { repositoryManager } from '../services/repository-manager.js';
import { validateInput, gitBranchSchema } from '../utils/validator.js';
import { log } from '../utils/logger.js';
import { ToolResult } from '../types/index.js';

export const gitBranchTool = {
  name: 'git_branch',
  description: 'Gerencia branches do repositório (listar, criar, deletar)',
  inputSchema: {
    type: 'object',
    properties: {
      repository_path: {
        type: 'string',
        description: 'Caminho do repositório local'
      },
      action: {
        type: 'string',
        enum: ['list', 'create', 'delete'],
        description: 'Ação a ser executada'
      },
      name: {
        type: 'string',
        description: 'Nome da branch (para create/delete)'
      }
    },
    required: ['repository_path', 'action']
  }
};

export async function executeGitBranch(args: any): Promise<ToolResult> {
  try {
    // Validar inputs
    const validated = validateInput(gitBranchSchema, {
      path: args.repository_path,
      action: args.action,
      name: args.name
    });

    log.info(`Executando git_branch (${validated.action}): ${validated.path}`);

    // Obter repositório
    const executor = await repositoryManager.getRepository(validated.path);

    switch (validated.action) {
      case 'list': {
        const branches = await executor.listBranches();
        const branchList = branches.map(b => 
          `${b.current ? '* ' : '  '}${b.name} (${b.commit.substring(0, 7)})`
        ).join('\n');
        
        return {
          success: true,
          message: `Branches:\n${branchList}`,
          data: { branches }
        };
      }

      case 'create': {
        if (!validated.name) {
          throw new Error('Nome da branch é obrigatório para criar');
        }
        await executor.createBranch(validated.name);
        return {
          success: true,
          message: `Branch '${validated.name}' criada com sucesso`,
          data: { name: validated.name }
        };
      }

      case 'delete': {
        if (!validated.name) {
          throw new Error('Nome da branch é obrigatório para deletar');
        }
        await executor.deleteBranch(validated.name);
        return {
          success: true,
          message: `Branch '${validated.name}' deletada com sucesso`,
          data: { name: validated.name }
        };
      }

      default:
        throw new Error(`Ação inválida: ${validated.action}`);
    }
  } catch (error) {
    log.error('Erro ao executar git_branch', error);
    return {
      success: false,
      message: 'Falha ao gerenciar branches',
      error: error instanceof Error ? {
        type: 'UNKNOWN_ERROR' as any,
        message: error.message,
        recoverable: false
      } : undefined
    };
  }
}

// Made with Bob
