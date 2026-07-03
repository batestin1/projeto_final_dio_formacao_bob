/**
 * Tool: git_clone
 * Clona um repositório do GitHub
 */

import { GitExecutor } from '../services/git-executor.js';
import { repositoryManager } from '../services/repository-manager.js';
import { validateInput, gitCloneSchema } from '../utils/validator.js';
import { log } from '../utils/logger.js';
import { ToolResult } from '../types/index.js';

export const gitCloneTool = {
  name: 'git_clone',
  description: 'Clona um repositório do GitHub para o sistema local',
  inputSchema: {
    type: 'object',
    properties: {
      repository_url: {
        type: 'string',
        description: 'URL do repositório (HTTPS ou SSH)'
      },
      destination_path: {
        type: 'string',
        description: 'Caminho local de destino'
      },
      branch: {
        type: 'string',
        description: 'Branch específica para clonar (opcional)'
      }
    },
    required: ['repository_url', 'destination_path']
  }
};

export async function executeGitClone(args: any): Promise<ToolResult> {
  try {
    // Validar inputs
    const validated = validateInput(gitCloneSchema, {
      url: args.repository_url,
      path: args.destination_path,
      branch: args.branch
    });

    log.info(`Executando git_clone: ${validated.url} -> ${validated.path}`);

    // Criar executor temporário para clone
    const executor = new GitExecutor(process.cwd());
    await executor.clone(validated.url, validated.path, validated.branch);

    // Registrar repositório no gerenciador
    repositoryManager.registerRepository(
      validated.path,
      validated.url,
      validated.branch
    );

    return {
      success: true,
      message: `Repositório clonado com sucesso em: ${validated.path}`,
      data: {
        path: validated.path,
        url: validated.url,
        branch: validated.branch || 'default'
      }
    };
  } catch (error) {
    log.error('Erro ao executar git_clone', error);
    return {
      success: false,
      message: 'Falha ao clonar repositório',
      error: error instanceof Error ? { 
        type: 'UNKNOWN_ERROR' as any,
        message: error.message,
        recoverable: false
      } : undefined
    };
  }
}

// Made with Bob
