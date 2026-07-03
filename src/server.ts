/**
 * Servidor MCP principal para GitHub
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { log } from './utils/logger.js';
import { config } from './config/config.js';
import { credentialHelper } from './services/credential-helper.js';
import { repositoryManager } from './services/repository-manager.js';

import {
  gitCloneTool,
  gitStatusTool,
  gitCommitTool,
  gitPushTool,
  gitPullTool,
  gitBranchTool,
  gitCheckoutTool,
  executeGitClone,
  executeGitStatus,
  executeGitCommit,
  executeGitPush,
  executeGitPull,
  executeGitBranch,
  executeGitCheckout,
} from './tools/index.js';

export class GitHubMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'mcp-github-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
    log.info('GitHubMCPServer inicializado');
  }

  /**
   * Configura os handlers do servidor
   */
  private setupHandlers(): void {
    // Handler para listar tools disponíveis
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      log.debug('Listando tools disponíveis');
      return {
        tools: [
          gitCloneTool,
          gitStatusTool,
          gitCommitTool,
          gitPushTool,
          gitPullTool,
          gitBranchTool,
          gitCheckoutTool,
        ],
      };
    });

    // Handler para executar tools
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      log.info(`Executando tool: ${name}`);

      try {
        // Verificar se PAT está configurado
        if (!credentialHelper.hasPAT()) {
          throw new Error('GitHub PAT não configurado. Configure a variável GITHUB_PAT');
        }

        // Rotear para a tool apropriada
        let result;
        switch (name) {
          case 'git_clone':
            result = await executeGitClone(args);
            break;
          case 'git_status':
            result = await executeGitStatus(args);
            break;
          case 'git_commit':
            result = await executeGitCommit(args);
            break;
          case 'git_push':
            result = await executeGitPush(args);
            break;
          case 'git_pull':
            result = await executeGitPull(args);
            break;
          case 'git_branch':
            result = await executeGitBranch(args);
            break;
          case 'git_checkout':
            result = await executeGitCheckout(args);
            break;
          default:
            throw new Error(`Tool desconhecida: ${name}`);
        }

        // Retornar resultado
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        log.error(`Erro ao executar tool ${name}`, error);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  success: false,
                  message: error instanceof Error ? error.message : 'Erro desconhecido',
                },
                null,
                2
              ),
            },
          ],
          isError: true,
        };
      }
    });
  }

  /**
   * Inicia o servidor
   */
  async start(): Promise<void> {
    try {
      log.info('Iniciando MCP GitHub Server...');
      
      // Validar configuração
      const serverConfig = config.getConfig();
      log.info(`Configuração carregada: ${JSON.stringify(serverConfig)}`);

      // Validar PAT
      if (credentialHelper.hasPAT()) {
        log.info('✅ GitHub PAT configurado');
      } else {
        log.warn('⚠️ GitHub PAT não configurado - algumas operações falharão');
      }

      // Criar transporte stdio
      const transport = new StdioServerTransport();
      await this.server.connect(transport);

      log.info('🚀 MCP GitHub Server iniciado com sucesso!');
      log.info(`📦 Tools disponíveis: git_clone, git_status, git_commit, git_push, git_pull, git_branch, git_checkout`);
    } catch (error) {
      log.error('Erro ao iniciar servidor', error);
      throw error;
    }
  }

  /**
   * Para o servidor
   */
  async stop(): Promise<void> {
    try {
      log.info('Parando MCP GitHub Server...');
      await this.server.close();
      log.info('Servidor parado com sucesso');
    } catch (error) {
      log.error('Erro ao parar servidor', error);
      throw error;
    }
  }

  /**
   * Obtém estatísticas do servidor
   */
  getStats() {
    return {
      repositories: repositoryManager.getStats(),
      config: config.getConfig(),
    };
  }
}

// Made with Bob
