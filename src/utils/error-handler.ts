/**
 * Sistema centralizado de tratamento de erros
 */

import { GitError, GitErrorType } from '../types/index.js';

interface ErrorPattern {
  pattern: RegExp;
  type: GitErrorType;
  suggestion: string;
}

export class ErrorHandler {
  private errorPatterns: ErrorPattern[] = [
    {
      pattern: /Authentication failed|invalid credentials/i,
      type: GitErrorType.AUTHENTICATION_FAILED,
      suggestion: 'Verifique se o PAT está correto e tem as permissões necessárias'
    },
    {
      pattern: /Repository not found|could not read from remote/i,
      type: GitErrorType.REPOSITORY_NOT_FOUND,
      suggestion: 'Verifique se a URL do repositório está correta e se você tem acesso'
    },
    {
      pattern: /CONFLICT|Merge conflict/i,
      type: GitErrorType.MERGE_CONFLICT,
      suggestion: 'Resolva os conflitos manualmente e execute git add/commit'
    },
    {
      pattern: /network|connection|timeout/i,
      type: GitErrorType.NETWORK_ERROR,
      suggestion: 'Verifique sua conexão com a internet e tente novamente'
    },
    {
      pattern: /unknown revision|invalid reference/i,
      type: GitErrorType.INVALID_REFERENCE,
      suggestion: 'Verifique se a branch/commit/tag especificada existe'
    },
    {
      pattern: /Permission denied|insufficient permission/i,
      type: GitErrorType.PERMISSION_DENIED,
      suggestion: 'Verifique as permissões do PAT ou do sistema de arquivos'
    },
    {
      pattern: /working tree.*changes|uncommitted changes/i,
      type: GitErrorType.DIRTY_WORKING_TREE,
      suggestion: 'Faça commit ou stash das mudanças antes de continuar'
    },
    {
      pattern: /HEAD detached|not currently on any branch/i,
      type: GitErrorType.DETACHED_HEAD,
      suggestion: 'Crie uma nova branch ou faça checkout de uma branch existente'
    }
  ];

  /**
   * Analisa um erro do Git e retorna um GitError estruturado
   */
  parseGitError(error: Error): GitError {
    const errorMessage = error.message;

    for (const pattern of this.errorPatterns) {
      if (pattern.pattern.test(errorMessage)) {
        return {
          type: pattern.type,
          message: errorMessage,
          suggestion: pattern.suggestion,
          recoverable: this.isRecoverable(pattern.type)
        };
      }
    }

    return {
      type: GitErrorType.UNKNOWN_ERROR,
      message: errorMessage,
      recoverable: false
    };
  }

  /**
   * Verifica se um tipo de erro é recuperável
   */
  private isRecoverable(errorType: GitErrorType): boolean {
    const recoverableErrors = [
      GitErrorType.NETWORK_ERROR,
      GitErrorType.DIRTY_WORKING_TREE,
      GitErrorType.MERGE_CONFLICT
    ];
    return recoverableErrors.includes(errorType);
  }

  /**
   * Formata um GitError para exibição
   */
  formatError(gitError: GitError): string {
    let formatted = `[${gitError.type}] ${gitError.message}`;
    
    if (gitError.suggestion) {
      formatted += `\n💡 Sugestão: ${gitError.suggestion}`;
    }
    
    if (gitError.details) {
      formatted += `\n📝 Detalhes: ${gitError.details}`;
    }
    
    return formatted;
  }
}

export const errorHandler = new ErrorHandler();

// Made with Bob
