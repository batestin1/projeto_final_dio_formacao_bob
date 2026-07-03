import * as fs from 'fs';
import * as path from 'path';

interface Trilha {
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

interface TrilhasData {
  trilhas: Trilha[];
}

export function executarComandoTrilha(tecnologia: string): string {
  try {
    // Carregar o arquivo JSON
    const dataPath = path.join(__dirname, '../data/trilhas_dio.json');
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    const data: TrilhasData = JSON.parse(jsonData);

    // Buscar trilhas que correspondem à tecnologia (case-insensitive)
    const trilhasEncontradas = data.trilhas.filter(trilha => 
      trilha.tecnologia.toLowerCase().includes(tecnologia.toLowerCase()) ||
      trilha.nome.toLowerCase().includes(tecnologia.toLowerCase())
    );

    if (trilhasEncontradas.length === 0) {
      return `❌ Nenhuma trilha encontrada para a tecnologia: **${tecnologia}**\n\n` +
             `💡 Tecnologias disponíveis: Python, Java, JavaScript, React, Angular, Node.js, DevOps, AWS, Azure, Kotlin, Swift, Flutter, Go, Rust, PHP, Ruby, C#, Vue.js, Unity, Blockchain, e mais!`;
    }

    // Formatar o plano de estudos
    let resultado = `# 🎯 Plano de Estudos - ${tecnologia}\n\n`;
    resultado += `📚 **${trilhasEncontradas.length} trilha(s) encontrada(s)**\n\n`;
    resultado += `---\n\n`;

    trilhasEncontradas.forEach((trilha, index) => {
      resultado += `## ${index + 1}. ${trilha.nome}\n\n`;
      resultado += `### 📊 Informações Gerais\n`;
      resultado += `- **Tecnologia:** ${trilha.tecnologia}\n`;
      resultado += `- **Nível:** ${trilha.nivel}\n`;
      resultado += `- **Módulos:** ${trilha.numeroModulos}\n`;
      resultado += `- **XP Total:** ${trilha.xpTotal.toLocaleString('pt-BR')} pontos\n`;
      resultado += `- **Acesso Vitalício:** ${trilha.vitalicio ? '✅ Sim' : '❌ Não'}\n\n`;

      resultado += `### 🏆 Badges Disponíveis\n`;
      trilha.badgesDisponiveis.forEach(badge => {
        resultado += `- 🎖️ ${badge}\n`;
      });
      resultado += `\n`;

      if (trilha.livesAoVivo.length > 0) {
        resultado += `### 🎥 Lives ao Vivo\n`;
        trilha.livesAoVivo.forEach(live => {
          resultado += `- 📺 ${live}\n`;
        });
        resultado += `\n`;
      }

      if (trilha.promocoes.length > 0) {
        resultado += `### 🎁 Promoções Ativas\n`;
        trilha.promocoes.forEach(promo => {
          resultado += `- 🔥 ${promo}\n`;
        });
        resultado += `\n`;
      }

      resultado += `### 📝 Plano de Estudos Sugerido\n\n`;
      resultado += `#### Fase 1: Fundamentos (Módulos 1-${Math.ceil(trilha.numeroModulos / 3)})\n`;
      resultado += `- Conceitos básicos e sintaxe\n`;
      resultado += `- Estruturas de dados fundamentais\n`;
      resultado += `- Primeiros projetos práticos\n`;
      resultado += `- **Tempo estimado:** ${Math.ceil(trilha.numeroModulos / 3)} semanas\n\n`;

      resultado += `#### Fase 2: Intermediário (Módulos ${Math.ceil(trilha.numeroModulos / 3) + 1}-${Math.ceil(trilha.numeroModulos * 2 / 3)})\n`;
      resultado += `- Conceitos avançados\n`;
      resultado += `- Padrões de projeto\n`;
      resultado += `- Desenvolvimento de aplicações completas\n`;
      resultado += `- **Tempo estimado:** ${Math.ceil(trilha.numeroModulos / 3)} semanas\n\n`;

      resultado += `#### Fase 3: Avançado (Módulos ${Math.ceil(trilha.numeroModulos * 2 / 3) + 1}-${trilha.numeroModulos})\n`;
      resultado += `- Arquitetura e boas práticas\n`;
      resultado += `- Otimização e performance\n`;
      resultado += `- Projeto final integrador\n`;
      resultado += `- **Tempo estimado:** ${trilha.numeroModulos - Math.ceil(trilha.numeroModulos * 2 / 3)} semanas\n\n`;

      resultado += `### 🎯 Próximos Passos\n`;
      resultado += `1. Inscreva-se na formação\n`;
      resultado += `2. Configure seu ambiente de desenvolvimento\n`;
      resultado += `3. Participe das lives ao vivo\n`;
      resultado += `4. Complete os desafios de código (use \`/desafio\`)\n`;
      resultado += `5. Obtenha seu certificado (use \`/certificado\`)\n\n`;

      if (index < trilhasEncontradas.length - 1) {
        resultado += `---\n\n`;
      }
    });

    return resultado;

  } catch (error) {
    return `❌ Erro ao carregar as trilhas: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
  }
}

// Made with Bob
