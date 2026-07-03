/**
 * Gerenciador de múltiplos repositórios
 */

import { GitExecutor } from './git-executor.js';
import { RepositoryConfig } from '../types/index.js';
import { log } from '../utils/logger.js';
import { isGitRepository } from '../utils/validator.js';

export class RepositoryManager {
  private repositories: Map<string, GitExecutor> = new Map();
  private configs: Map<string, RepositoryConfig> = new Map();

  /**
   * Obtém ou cria um executor Git para um repositório
   */
  async getRepository(path: string): Promise<GitExecutor> {
    // Verificar se já existe
    if (this.repositories.has(path)) {
      const config = this.configs.get(path);
      if (config) {
        config.lastAccessed = new Date();
      }
      return this.repositories.get(path)!;
    }

    // Verificar se é um repositório Git válido
    const isValid = await isGitRepository(path);
    if (!isValid) {
      throw new Error(`Path não é um repositório Git válido: ${path}`);
    }

    // Criar novo executor
    const executor = new GitExecutor(path);
    this.repositories.set(path, executor);
    
    // Salvar configuração
    this.configs.set(path, {
      path,
      lastAccessed: new Date()
    });

    log.info(`Repositório registrado: ${path}`);
    return executor;
  }

  /**
   * Registra um novo repositório após clone
   */
  registerRepository(path: string, url: string, branch?: string): void {
    const executor = new GitExecutor(path);
    this.repositories.set(path, executor);
    
    this.configs.set(path, {
      path,
      url,
      branch,
      lastAccessed: new Date()
    });

    log.info(`Repositório registrado após clone: ${path}`);
  }

  /**
   * Remove um repositório do gerenciador
   */
  removeRepository(path: string): void {
    this.repositories.delete(path);
    this.configs.delete(path);
    log.info(`Repositório removido: ${path}`);
  }

  /**
   * Lista todos os repositórios gerenciados
   */
  listRepositories(): RepositoryConfig[] {
    return Array.from(this.configs.values());
  }

  /**
   * Limpa repositórios não acessados recentemente
   */
  cleanupOldRepositories(maxAgeMinutes: number = 60): void {
    const now = new Date();
    const removed: string[] = [];

    for (const [path, config] of this.configs.entries()) {
      if (config.lastAccessed) {
        const ageMinutes = (now.getTime() - config.lastAccessed.getTime()) / 1000 / 60;
        if (ageMinutes > maxAgeMinutes) {
          this.removeRepository(path);
          removed.push(path);
        }
      }
    }

    if (removed.length > 0) {
      log.info(`Repositórios antigos removidos: ${removed.join(', ')}`);
    }
  }

  /**
   * Obtém estatísticas dos repositórios
   */
  getStats(): { total: number; paths: string[] } {
    return {
      total: this.repositories.size,
      paths: Array.from(this.repositories.keys())
    };
  }
}

export const repositoryManager = new RepositoryManager();

// Made with Bob
