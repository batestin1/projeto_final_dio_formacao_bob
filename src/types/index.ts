/**
 * Tipos principais do MCP GitHub Server
 */

export enum GitErrorType {
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
  REPOSITORY_NOT_FOUND = 'REPOSITORY_NOT_FOUND',
  MERGE_CONFLICT = 'MERGE_CONFLICT',
  NETWORK_ERROR = 'NETWORK_ERROR',
  INVALID_REFERENCE = 'INVALID_REFERENCE',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  DIRTY_WORKING_TREE = 'DIRTY_WORKING_TREE',
  DETACHED_HEAD = 'DETACHED_HEAD',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface GitError {
  type: GitErrorType;
  message: string;
  details?: string;
  suggestion?: string;
  recoverable: boolean;
}

export interface RepositoryConfig {
  path: string;
  url?: string;
  branch?: string;
  lastAccessed?: Date;
}

export interface ServerConfig {
  logLevel: string;
  logPath: string;
  autoFetch: boolean;
  defaultBranch: string;
  timeout: number;
  allowForcePush: boolean;
  encryptionEnabled: boolean;
}

export interface GitCredentials {
  token: string;
  username?: string;
}

export interface ToolResult {
  success: boolean;
  message: string;
  data?: any;
  error?: GitError;
}

export interface GitStatusResult {
  branch: string;
  ahead: number;
  behind: number;
  modified: string[];
  created: string[];
  deleted: string[];
  renamed: string[];
  staged: string[];
  conflicted: string[];
  isClean: boolean;
}

export interface GitLogEntry {
  hash: string;
  date: string;
  message: string;
  author: string;
  email: string;
}

export interface GitBranchInfo {
  name: string;
  current: boolean;
  commit: string;
  remote?: string;
}

// Made with Bob
