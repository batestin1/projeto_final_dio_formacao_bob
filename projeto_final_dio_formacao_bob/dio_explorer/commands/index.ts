/**
 * DIO Explorer - Sistema de Comandos Slash
 * 
 * Este módulo centraliza todos os comandos slash disponíveis para interação
 * com a plataforma DIO (Digital Innovation One).
 * 
 * Comandos disponíveis:
 * - /trilha <tecnologia> - Exibe plano de estudos formatado
 * - /desafio <tecnologia> [nivel] - Gera desafio de código aleatório
 * - /certificado <nome> <tecnologia> - Gera certificado de conclusão
 */

import { executarComandoTrilha } from './trilha';
import { executarComandoDesafio } from './desafio';
import { executarComandoCertificado } from './certificado';

/**
 * Interface para definição de comandos slash
 */
interface SlashCommand {
  name: string;
  description: string;
  usage: string;
  examples: string[];
  handler: (...args: string[]) => string;
}

/**
 * Registro de todos os comandos slash disponíveis
 */
export const slashCommands: Record<string, SlashCommand> = {
  trilha: {
    name: 'trilha',
    description: 'Exibe o plano de estudos detalhado de uma trilha/tecnologia da DIO',
    usage: '/trilha <tecnologia>',
    examples: [
      '/trilha Python',
      '/trilha JavaScript',
      '/trilha React',
      '/trilha Java'
    ],
    handler: (tecnologia: string) => {
      if (!tecnologia) {
        return '❌ Por favor, especifique uma tecnologia.\n\n' +
               '**Uso:** `/trilha <tecnologia>`\n\n' +
               '**Exemplo:** `/trilha Python`';
      }
      return executarComandoTrilha(tecnologia);
    }
  },

  desafio: {
    name: 'desafio',
    description: 'Gera um desafio de código aleatório baseado na tecnologia e nível escolhidos',
    usage: '/desafio <tecnologia> [nivel]',
    examples: [
      '/desafio Python',
      '/desafio JavaScript Básico',
      '/desafio Java Intermediário',
      '/desafio React Avançado'
    ],
    handler: (tecnologia: string, nivel?: string) => {
      if (!tecnologia) {
        return '❌ Por favor, especifique uma tecnologia.\n\n' +
               '**Uso:** `/desafio <tecnologia> [nivel]`\n\n' +
               '**Níveis disponíveis:** Básico, Intermediário, Avançado\n\n' +
               '**Exemplos:**\n' +
               '- `/desafio Python`\n' +
               '- `/desafio JavaScript Intermediário`';
      }
      return executarComandoDesafio(tecnologia, nivel || 'todos');
    }
  },

  certificado: {
    name: 'certificado',
    description: 'Gera um certificado fictício de conclusão em formato Markdown',
    usage: '/certificado "<nome>" "<tecnologia>"',
    examples: [
      '/certificado "João Silva" "Python"',
      '/certificado "Maria Santos" "JavaScript"',
      '/certificado "Pedro Oliveira" "Java"'
    ],
    handler: (nomeCompleto: string, tecnologia?: string) => {
      // Tentar parsear argumentos se vieram juntos
      let nome = nomeCompleto;
      let tech = tecnologia;

      // Se não houver tecnologia separada, tentar extrair do nome
      if (!tech && nomeCompleto) {
        const partes = nomeCompleto.split('"').filter(p => p.trim());
        if (partes.length >= 2) {
          nome = partes[0].trim();
          tech = partes[1].trim();
        }
      }

      if (!nome || !tech) {
        return '❌ Por favor, forneça seu nome e a tecnologia.\n\n' +
               '**Uso:** `/certificado "<nome>" "<tecnologia>"`\n\n' +
               '**Exemplos:**\n' +
               '- `/certificado "João Silva" "Python"`\n' +
               '- `/certificado "Maria Santos" "JavaScript"`';
      }

      return executarComandoCertificado(nome, tech);
    }
  }
};

/**
 * Processa um comando slash e retorna o resultado
 * 
 * @param input - String completa do comando (ex: "/trilha Python")
 * @returns Resultado da execução do comando
 */
export function processarComando(input: string): string {
  // Remover espaços extras e dividir o comando
  const trimmedInput = input.trim();
  
  // Verificar se começa com /
  if (!trimmedInput.startsWith('/')) {
    return '❌ Comandos devem começar com `/`\n\n' +
           'Use `/help` para ver os comandos disponíveis.';
  }

  // Extrair comando e argumentos
  const semBarra = trimmedInput.substring(1);
  
  // Tratamento especial para argumentos entre aspas
  const regex = /[^\s"]+|"([^"]*)"/gi;
  const partes: string[] = [];
  let match;
  
  while ((match = regex.exec(semBarra)) !== null) {
    partes.push(match[1] ? match[1] : match[0]);
  }

  const comando = partes[0]?.toLowerCase();
  const args = partes.slice(1);

  // Comando help
  if (comando === 'help') {
    return gerarMensagemHelp();
  }

  // Verificar se o comando existe
  const slashCommand = slashCommands[comando];
  if (!slashCommand) {
    return `❌ Comando desconhecido: \`/${comando}\`\n\n` +
           'Use `/help` para ver os comandos disponíveis.';
  }

  // Executar o comando
  try {
    return slashCommand.handler(...args);
  } catch (error) {
    return `❌ Erro ao executar comando: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
  }
}

/**
 * Gera mensagem de ajuda com todos os comandos disponíveis
 */
function gerarMensagemHelp(): string {
  let help = '# 📚 DIO Explorer - Comandos Disponíveis\n\n';
  help += 'Sistema de comandos slash para interação com a plataforma DIO.\n\n';
  help += '---\n\n';

  Object.values(slashCommands).forEach(cmd => {
    help += `## /${cmd.name}\n\n`;
    help += `**Descrição:** ${cmd.description}\n\n`;
    help += `**Uso:** \`${cmd.usage}\`\n\n`;
    help += `**Exemplos:**\n`;
    cmd.examples.forEach(example => {
      help += `- \`${example}\`\n`;
    });
    help += `\n---\n\n`;
  });

  help += '## 💡 Dicas\n\n';
  help += '- Use aspas duplas para argumentos com espaços\n';
  help += '- Os comandos não são case-sensitive\n';
  help += '- Você pode usar `/help` a qualquer momento\n\n';
  help += '---\n\n';
  help += '🚀 **Comece sua jornada de aprendizado agora!**';

  return help;
}

/**
 * Exporta funções individuais dos comandos
 */
export {
  executarComandoTrilha,
  executarComandoDesafio,
  executarComandoCertificado
};

/**
 * Exporta função principal de processamento
 */
export default processarComando;

// Made with Bob
