/**
 * Tipos e interfaces para o MCP Server do DIO Explorer
 */

export interface Trilha {
  id: number;
  nome: string;
  tecnologia: string;
  nivel: string;
  numeroModulos: number;
  xpTotal: number;
  badgesDisponiveis: string[];
  promocoes: string[];
  vitalicio: boolean;
  livesAoVivo: string[];
}

export interface TrilhasData {
  trilhas: Trilha[];
}

export interface Desafio {
  titulo: string;
  descricao: string;
  dificuldade: string;
  pontos: number;
  requisitos: string[];
  dicas: string[];
  exemplos: {
    entrada: string;
    saida: string;
  }[];
}

export interface CertificadoData {
  nomeUsuario: string;
  tecnologia: string;
  trilha: Trilha;
  dataEmissao: string;
  codigoCertificado: string;
  cargaHoraria: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ToolInput {
  tecnologia?: string;
  nivel?: string;
  nome?: string;
  filtro?: string;
}

export interface ServerConfig {
  port: number;
  host: string;
  corsOrigins: string[];
  jwtSecret: string;
  enableSSO: boolean;
  ssoProvider?: string;
}

export interface User {
  id: string;
  email: string;
  nome: string;
  role: 'user' | 'admin';
}

export interface AuthToken {
  token: string;
  expiresIn: number;
  user: User;
}

// Made with Bob
