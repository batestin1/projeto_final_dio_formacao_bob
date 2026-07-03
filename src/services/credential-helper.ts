/**
 * Helper para gerenciamento de credenciais do GitHub
 */

import CryptoJS from 'crypto-js';
import { log } from '../utils/logger.js';
import { githubPatSchema } from '../utils/validator.js';

export class CredentialHelper {
  private pat: string | null = null;
  private encryptionKey: string;

  constructor() {
    // Usar uma chave de criptografia do ambiente ou gerar uma
    this.encryptionKey = process.env.MCP_GITHUB_ENCRYPTION_KEY || 'default-key-change-me';
    this.loadPAT();
  }

  /**
   * Carrega o PAT do ambiente
   */
  private loadPAT(): void {
    const pat = process.env.GITHUB_PAT;
    
    if (!pat) {
      log.warn('GITHUB_PAT não encontrado nas variáveis de ambiente');
      return;
    }

    try {
      // Validar formato do PAT
      githubPatSchema.parse(pat);
      this.pat = pat;
      log.info('PAT do GitHub carregado com sucesso');
    } catch (error) {
      log.error('PAT do GitHub inválido', error);
      throw new Error('PAT do GitHub inválido. Deve começar com ghp_ e ter 40 caracteres');
    }
  }

  /**
   * Retorna o PAT descriptografado
   */
  getPAT(): string {
    if (!this.pat) {
      throw new Error('PAT do GitHub não configurado. Configure a variável GITHUB_PAT');
    }
    return this.pat;
  }

  /**
   * Verifica se o PAT está configurado
   */
  hasPAT(): boolean {
    return this.pat !== null;
  }

  /**
   * Injeta o PAT em uma URL HTTPS do Git
   */
  injectPATIntoURL(url: string): string {
    if (!this.hasPAT()) {
      throw new Error('PAT não configurado');
    }

    // Se já tem credenciais na URL, não modificar
    if (url.includes('@')) {
      return url;
    }

    // Converter SSH para HTTPS se necessário
    if (url.startsWith('git@github.com:')) {
      url = url.replace('git@github.com:', 'https://github.com/');
    }

    // Injetar PAT na URL HTTPS
    if (url.startsWith('https://github.com/')) {
      const pat = this.getPAT();
      return url.replace('https://github.com/', `https://${pat}@github.com/`);
    }

    return url;
  }

  /**
   * Remove credenciais de uma URL para logging seguro
   */
  sanitizeURL(url: string): string {
    return url.replace(/\/\/[^@]+@/, '//***@');
  }

  /**
   * Criptografa o PAT para armazenamento
   */
  encryptPAT(pat: string): string {
    return CryptoJS.AES.encrypt(pat, this.encryptionKey).toString();
  }

  /**
   * Descriptografa o PAT
   */
  decryptPAT(encryptedPAT: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedPAT, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  /**
   * Valida se o PAT tem as permissões necessárias
   * (Isso seria feito fazendo uma chamada à API do GitHub)
   */
  async validatePAT(): Promise<boolean> {
    if (!this.hasPAT()) {
      return false;
    }

    try {
      // Aqui poderíamos fazer uma chamada à API do GitHub para validar
      // Por enquanto, apenas verificamos se o formato está correto
      githubPatSchema.parse(this.pat);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Limpa o PAT da memória
   */
  clearPAT(): void {
    this.pat = null;
    log.info('PAT limpo da memória');
  }
}

export const credentialHelper = new CredentialHelper();

// Made with Bob
