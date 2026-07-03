/**
 * Gerenciamento de configurações do servidor
 */

import { ServerConfig } from '../types/index.js';

export class Config {
  private config: ServerConfig;

  constructor() {
    this.config = this.loadConfig();
  }

  /**
   * Carrega configurações do ambiente
   */
  private loadConfig(): ServerConfig {
    return {
      logLevel: process.env.MCP_GITHUB_LOG_LEVEL || 'info',
      logPath: process.env.MCP_GITHUB_LOG_PATH || './logs',
      autoFetch: process.env.MCP_GITHUB_AUTO_FETCH === 'true',
      defaultBranch: process.env.MCP_GITHUB_DEFAULT_BRANCH || 'main',
      timeout: parseInt(process.env.MCP_GITHUB_TIMEOUT || '30000'),
      allowForcePush: process.env.MCP_GITHUB_ALLOW_FORCE_PUSH === 'true',
      encryptionEnabled: process.env.MCP_GITHUB_ENCRYPTION_ENABLED !== 'false'
    };
  }

  /**
   * Obtém a configuração completa
   */
  getConfig(): ServerConfig {
    return { ...this.config };
  }

  /**
   * Obtém um valor específico da configuração
   */
  get<K extends keyof ServerConfig>(key: K): ServerConfig[K] {
    return this.config[key];
  }

  /**
   * Atualiza um valor da configuração
   */
  set<K extends keyof ServerConfig>(key: K, value: ServerConfig[K]): void {
    this.config[key] = value;
  }
}

export const config = new Config();

// Made with Bob
