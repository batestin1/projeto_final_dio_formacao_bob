/**
 * Handler de Slash Commands para Bob
 * 
 * Este arquivo integra os comandos slash do DIO Explorer com o Bob,
 * permitindo que sejam executados diretamente no chat.
 */

import * as path from 'path';
import * as fs from 'fs';

// Importar o processador de comandos do DIO Explorer
const dioExplorerPath = path.join(__dirname, '../projeto_final_dio_formacao_bob/dio_explorer/commands/index.ts');

// Função para carregar dinamicamente o módulo
async function carregarDIOExplorer() {
  try {
    // Verificar se o arquivo existe
    if (!fs.existsSync(dioExplorerPath)) {
      throw new Error(`Arquivo não encontrado: ${dioExplorerPath}`);
    }

    // Importar o módulo dinamicamente
    const dioExplorer = await import(dioExplorerPath);
    return dioExplorer.default || dioExplorer.processarComando;
  } catch (error) {
    console.error('Erro ao carregar DIO Explorer:', error);
    throw error;
  }
}

/**
 * Processa um comando slash e retorna o resultado
 * 
 * @param comando - Comando completo (ex: "/trilha Python")
 * @returns Resultado formatado em Markdown
 */
export async function executarSlashCommand(comando: string): Promise<string> {
  try {
    // Validar que o comando começa com /
    if (!comando.startsWith('/')) {
      return '❌ Comandos devem começar com `/`\n\nComandos disponíveis:\n- `/trilha <tecnologia>`\n- `/desafio <tecnologia> [nivel]`\n- `/certificado "<nome>" "<tecnologia>"`';
    }

    // Carregar o processador de comandos
    const processarComando = await carregarDIOExplorer();

    // Executar o comando
    const resultado = processarComando(comando);

    return resultado;

  } catch (error) {
    return `❌ Erro ao executar comando: ${error instanceof Error ? error.message : 'Erro desconhecido'}\n\n` +
           `Certifique-se de que o DIO Explorer está instalado corretamente.`;
  }
}

/**
 * Lista todos os comandos disponíveis
 */
export function listarComandos(): string {
  return `# 📚 Comandos Slash Disponíveis

## /trilha <tecnologia>
Exibe o plano de estudos detalhado de uma trilha/tecnologia da DIO.

**Exemplos:**
- \`/trilha Python\`
- \`/trilha JavaScript\`
- \`/trilha React\`

---

## /desafio <tecnologia> [nivel]
Gera um desafio de código aleatório baseado na tecnologia e nível escolhidos.

**Níveis:** Básico, Intermediário, Avançado

**Exemplos:**
- \`/desafio Python\`
- \`/desafio JavaScript Intermediário\`
- \`/desafio Java Avançado\`

---

## /certificado "<nome>" "<tecnologia>"
Gera um certificado fictício de conclusão em formato Markdown.

**Exemplos:**
- \`/certificado "João Silva" "Python"\`
- \`/certificado "Maria Santos" "JavaScript"\`

---

💡 **Dica:** Use aspas duplas para argumentos com espaços!
`;
}

// Exportar funções principais
export default executarSlashCommand;

// Made with Bob
