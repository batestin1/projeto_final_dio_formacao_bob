/**
 * Executor de comandos Git usando simple-git
 */

import simpleGit, { SimpleGit, StatusResult } from 'simple-git';
import { log } from '../utils/logger.js';
import { errorHandler } from '../utils/error-handler.js';
import { credentialHelper } from './credential-helper.js';
import { GitError, GitStatusResult, GitLogEntry, GitBranchInfo } from '../types/index.js';

export class GitExecutor {
  private git: SimpleGit;
  private repoPath: string;

  constructor(repoPath: string) {
    this.repoPath = repoPath;
    
    // Configurar timeout
    const timeout = parseInt(process.env.MCP_GITHUB_TIMEOUT || '30000');
    this.git = simpleGit(repoPath, { timeout: { block: timeout } });
  }

  /**
   * Clona um repositório
   */
  async clone(url: string, targetPath: string, branch?: string): Promise<void> {
    try {
      log.info(`Clonando repositório: ${credentialHelper.sanitizeURL(url)}`);
      
      // Injetar PAT na URL
      const authenticatedUrl = credentialHelper.injectPATIntoURL(url);
      
      const options: string[] = [];
      if (branch) {
        options.push('--branch', branch);
      }
      
      await simpleGit().clone(authenticatedUrl, targetPath, options);
      log.info(`Repositório clonado com sucesso em: ${targetPath}`);
    } catch (error) {
      log.error('Erro ao clonar repositório', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtém o status do repositório
   */
  async status(): Promise<GitStatusResult> {
    try {
      log.debug(`Obtendo status do repositório: ${this.repoPath}`);
      const status: StatusResult = await this.git.status();
      
      return {
        branch: status.current || 'unknown',
        ahead: status.ahead,
        behind: status.behind,
        modified: status.modified,
        created: status.created,
        deleted: status.deleted,
        renamed: status.renamed.map(r => `${r.from} -> ${r.to}`),
        staged: status.staged,
        conflicted: status.conflicted,
        isClean: status.isClean()
      };
    } catch (error) {
      log.error('Erro ao obter status', error);
      throw this.handleError(error);
    }
  }

  /**
   * Adiciona arquivos ao stage
   */
  async add(files: string[] = ['.']): Promise<void> {
    try {
      log.debug(`Adicionando arquivos ao stage: ${files.join(', ')}`);
      await this.git.add(files);
    } catch (error) {
      log.error('Erro ao adicionar arquivos', error);
      throw this.handleError(error);
    }
  }

  /**
   * Faz commit das mudanças
   */
  async commit(message: string, files?: string[]): Promise<string> {
    try {
      log.info(`Fazendo commit: ${message}`);
      
      if (files && files.length > 0) {
        await this.add(files);
      }
      
      const result = await this.git.commit(message);
      log.info(`Commit realizado: ${result.commit}`);
      return result.commit;
    } catch (error) {
      log.error('Erro ao fazer commit', error);
      throw this.handleError(error);
    }
  }

  /**
   * Envia mudanças para o remote
   */
  async push(remote: string = 'origin', branch?: string, force: boolean = false): Promise<void> {
    try {
      const currentBranch = branch || (await this.getCurrentBranch());
      log.info(`Enviando mudanças para ${remote}/${currentBranch}`);
      
      const options: string[] = [];
      if (force) {
        if (process.env.MCP_GITHUB_ALLOW_FORCE_PUSH !== 'true') {
          throw new Error('Force push não permitido. Configure MCP_GITHUB_ALLOW_FORCE_PUSH=true');
        }
        options.push('--force');
      }
      
      await this.git.push(remote, currentBranch, options);
      log.info('Push realizado com sucesso');
    } catch (error) {
      log.error('Erro ao fazer push', error);
      throw this.handleError(error);
    }
  }

  /**
   * Baixa mudanças do remote
   */
  async pull(remote: string = 'origin', branch?: string): Promise<void> {
    try {
      const currentBranch = branch || (await this.getCurrentBranch());
      log.info(`Baixando mudanças de ${remote}/${currentBranch}`);
      
      await this.git.pull(remote, currentBranch);
      log.info('Pull realizado com sucesso');
    } catch (error) {
      log.error('Erro ao fazer pull', error);
      throw this.handleError(error);
    }
  }

  /**
   * Lista branches
   */
  async listBranches(): Promise<GitBranchInfo[]> {
    try {
      log.debug('Listando branches');
      const result = await this.git.branch();
      
      return result.all.map(name => ({
        name,
        current: name === result.current,
        commit: result.branches[name]?.commit || 'unknown',
        remote: result.branches[name]?.label
      }));
    } catch (error) {
      log.error('Erro ao listar branches', error);
      throw this.handleError(error);
    }
  }

  /**
   * Cria uma nova branch
   */
  async createBranch(name: string): Promise<void> {
    try {
      log.info(`Criando branch: ${name}`);
      await this.git.checkoutLocalBranch(name);
      log.info(`Branch ${name} criada com sucesso`);
    } catch (error) {
      log.error('Erro ao criar branch', error);
      throw this.handleError(error);
    }
  }

  /**
   * Deleta uma branch
   */
  async deleteBranch(name: string, force: boolean = false): Promise<void> {
    try {
      log.info(`Deletando branch: ${name}`);
      await this.git.deleteLocalBranch(name, force);
      log.info(`Branch ${name} deletada com sucesso`);
    } catch (error) {
      log.error('Erro ao deletar branch', error);
      throw this.handleError(error);
    }
  }

  /**
   * Faz checkout de uma branch
   */
  async checkout(branch: string, create: boolean = false): Promise<void> {
    try {
      log.info(`Fazendo checkout para: ${branch}`);
      
      if (create) {
        await this.git.checkoutLocalBranch(branch);
      } else {
        await this.git.checkout(branch);
      }
      
      log.info(`Checkout para ${branch} realizado com sucesso`);
    } catch (error) {
      log.error('Erro ao fazer checkout', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtém o histórico de commits
   */
  async log(maxCount: number = 10): Promise<GitLogEntry[]> {
    try {
      log.debug(`Obtendo histórico de commits (max: ${maxCount})`);
      const result = await this.git.log({ maxCount });
      
      return result.all.map(commit => ({
        hash: commit.hash,
        date: commit.date,
        message: commit.message,
        author: commit.author_name,
        email: commit.author_email
      }));
    } catch (error) {
      log.error('Erro ao obter log', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtém a branch atual
   */
  async getCurrentBranch(): Promise<string> {
    try {
      const result = await this.git.branch();
      return result.current;
    } catch (error) {
      log.error('Erro ao obter branch atual', error);
      throw this.handleError(error);
    }
  }

  /**
   * Trata erros do Git
   */
  private handleError(error: any): Error {
    const gitError: GitError = errorHandler.parseGitError(error);
    const formattedError = errorHandler.formatError(gitError);
    return new Error(formattedError);
  }
}

// Made with Bob
