/**
 * Definições de ferramentas MCP para o DIO Explorer
 */

import { z } from 'zod';
import { buscarTrilhaPorTecnologia, gerarDesafio, gerarCertificado } from './services.js';
import type { ToolInput } from './types.js';

/**
 * Schema de validação para buscar trilhas
 */
export const buscarTrilhaSchema = z.object({
  tecnologia: z.string().min(1).describe('Nome da tecnologia ou trilha a buscar (ex: Python, Java, React)')
});

/**
 * Schema de validação para gerar desafios
 */
export const gerarDesafioSchema = z.object({
  tecnologia: z.string().min(1).describe('Tecnologia do desafio (ex: Python, JavaScript, Java)'),
  nivel: z.enum(['Básico', 'Intermediário', 'Avançado', 'todos']).optional().default('todos').describe('Nível de dificuldade do desafio')
});

/**
 * Schema de validação para gerar certificados
 */
export const gerarCertificadoSchema = z.object({
  nome: z.string().min(1).describe('Nome completo do aluno'),
  tecnologia: z.string().min(1).describe('Tecnologia ou trilha concluída')
});

/**
 * Definição das ferramentas MCP disponíveis
 */
export const tools = [
  {
    name: 'buscar_trilha',
    description: 'Busca e retorna informações detalhadas sobre uma trilha de aprendizado da DIO, incluindo módulos, XP, badges e plano de estudos',
    inputSchema: {
      type: 'object',
      properties: {
        tecnologia: {
          type: 'string',
          description: 'Nome da tecnologia ou trilha a buscar (ex: Python, Java, React, JavaScript)'
        }
      },
      required: ['tecnologia']
    }
  },
  {
    name: 'gerar_desafio',
    description: 'Gera um desafio de código aleatório baseado na tecnologia e nível de dificuldade especificados',
    inputSchema: {
      type: 'object',
      properties: {
        tecnologia: {
          type: 'string',
          description: 'Tecnologia do desafio (ex: Python, JavaScript, Java, React)'
        },
        nivel: {
          type: 'string',
          enum: ['Básico', 'Intermediário', 'Avançado', 'todos'],
          description: 'Nível de dificuldade do desafio',
          default: 'todos'
        }
      },
      required: ['tecnologia']
    }
  },
  {
    name: 'gerar_certificado',
    description: 'Gera um certificado de conclusão em formato Markdown para uma trilha específica',
    inputSchema: {
      type: 'object',
      properties: {
        nome: {
          type: 'string',
          description: 'Nome completo do aluno que concluiu a trilha'
        },
        tecnologia: {
          type: 'string',
          description: 'Tecnologia ou trilha concluída (ex: Python, Java, React)'
        }
      },
      required: ['nome', 'tecnologia']
    }
  },
  {
    name: 'listar_tecnologias',
    description: 'Lista todas as tecnologias e trilhas disponíveis na plataforma DIO',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  }
];

/**
 * Handlers para execução das ferramentas
 */
export const toolHandlers = {
  buscar_trilha: async (input: ToolInput) => {
    try {
      buscarTrilhaSchema.parse(input);
      const resultado = buscarTrilhaPorTecnologia(input.tecnologia!);
      return {
        content: [
          {
            type: 'text',
            text: resultado
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ Erro ao buscar trilha: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
          }
        ],
        isError: true
      };
    }
  },

  gerar_desafio: async (input: ToolInput) => {
    try {
      gerarDesafioSchema.parse(input);
      const resultado = gerarDesafio(input.tecnologia!, input.nivel || 'todos');
      return {
        content: [
          {
            type: 'text',
            text: resultado
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ Erro ao gerar desafio: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
          }
        ],
        isError: true
      };
    }
  },

  gerar_certificado: async (input: ToolInput) => {
    try {
      gerarCertificadoSchema.parse(input);
      const resultado = gerarCertificado(input.nome!, input.tecnologia!);
      return {
        content: [
          {
            type: 'text',
            text: resultado
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ Erro ao gerar certificado: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
          }
        ],
        isError: true
      };
    }
  },

  listar_tecnologias: async () => {
    try {
      const tecnologias = [
        'Python', 'Java', 'JavaScript', 'React', 'Angular', 'Node.js',
        'DevOps', 'AWS', 'Azure', 'Kotlin', 'Swift', 'Flutter',
        'Go', 'Rust', 'PHP', 'Ruby', 'C#', 'Vue.js', 'Unity', 'Blockchain'
      ];

      let resultado = '# 🚀 Tecnologias Disponíveis na DIO\n\n';
      resultado += 'Lista completa de tecnologias e trilhas disponíveis:\n\n';
      
      tecnologias.forEach((tech, index) => {
        resultado += `${index + 1}. **${tech}**\n`;
      });
      
      resultado += '\n---\n\n';
      resultado += '💡 **Dica:** Use `buscar_trilha` com o nome da tecnologia para ver detalhes completos!\n\n';
      resultado += '**Exemplos:**\n';
      resultado += '- `buscar_trilha({ tecnologia: "Python" })`\n';
      resultado += '- `gerar_desafio({ tecnologia: "JavaScript", nivel: "Intermediário" })`\n';
      resultado += '- `gerar_certificado({ nome: "João Silva", tecnologia: "Java" })`';

      return {
        content: [
          {
            type: 'text',
            text: resultado
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ Erro ao listar tecnologias: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
          }
        ],
        isError: true
      };
    }
  }
};

// Made with Bob
