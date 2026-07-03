#!/usr/bin/env node

/**
 * DIO Explorer MCP Server
 * 
 * Servidor MCP (Model Context Protocol) para acesso às funcionalidades
 * do DIO Explorer via API, HTTPS e SSO.
 * 
 * Suporta:
 * - Busca de trilhas de aprendizado
 * - Geração de desafios de código
 * - Emissão de certificados
 * - Listagem de tecnologias disponíveis
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError
} from '@modelcontextprotocol/sdk/types.js';
import { tools, toolHandlers } from './tools.js';

/**
 * Cria e configura o servidor MCP
 */
class DIOExplorerMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'dio-explorer-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
    this.setupErrorHandling();
  }

  /**
   * Configura os handlers do servidor
   */
  private setupHandlers(): void {
    // Handler para listar ferramentas disponíveis
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools
    }));

    // Handler para executar ferramentas
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        // Verificar se a ferramenta existe
        const handler = toolHandlers[name as keyof typeof toolHandlers];
        
        if (!handler) {
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Ferramenta desconhecida: ${name}`
          );
        }

        // Executar a ferramenta
        const result = await handler(args || {});
        
        return result;
      } catch (error) {
        if (error instanceof McpError) {
          throw error;
        }

        throw new McpError(
          ErrorCode.InternalError,
          `Erro ao executar ferramenta ${name}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
        );
      }
    });
  }

  /**
   * Configura tratamento de erros
   */
  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  /**
   * Inicia o servidor
   */
  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    
    console.error('DIO Explorer MCP Server iniciado com sucesso!');
    console.error('Ferramentas disponíveis:');
    tools.forEach(tool => {
      console.error(`  - ${tool.name}: ${tool.description}`);
    });
  }
}

/**
 * Inicialização do servidor
 */
async function main() {
  try {
    const server = new DIOExplorerMCPServer();
    await server.start();
  } catch (error) {
    console.error('Erro ao iniciar servidor MCP:', error);
    process.exit(1);
  }
}

main();

// Made with Bob
