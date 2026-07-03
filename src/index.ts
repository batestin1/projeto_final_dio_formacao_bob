#!/usr/bin/env node

/**
 * Entry point do MCP GitHub Server
 */

import dotenv from 'dotenv';
import { GitHubMCPServer } from './server.js';
import { log } from './utils/logger.js';

// Carregar variáveis de ambiente
dotenv.config();

/**
 * Função principal
 */
async function main() {
  try {
    // Criar e iniciar servidor
    const server = new GitHubMCPServer();
    await server.start();

    // Handlers para shutdown gracioso
    const shutdown = async (signal: string) => {
      log.info(`Recebido sinal ${signal}, encerrando servidor...`);
      try {
        await server.stop();
        process.exit(0);
      } catch (error) {
        log.error('Erro ao encerrar servidor', error);
        process.exit(1);
      }
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));

    // Handler para erros não capturados
    process.on('uncaughtException', (error) => {
      log.error('Erro não capturado', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      log.error('Promise rejeitada não tratada', { reason, promise });
      process.exit(1);
    });

  } catch (error) {
    log.error('Erro fatal ao iniciar servidor', error);
    process.exit(1);
  }
}

// Executar
main();

// Made with Bob
