/**
 * Serviços do DIO Explorer - Implementações locais
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { Trilha, TrilhasData, Desafio, CertificadoData } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Carrega os dados das trilhas do arquivo JSON
 */
function carregarTrilhas(): TrilhasData {
  const dataPath = path.join(__dirname, '../../data/trilhas_dio.json');
  const jsonData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(jsonData);
}

/**
 * Busca trilhas por tecnologia
 */
export function buscarTrilhaPorTecnologia(tecnologia: string): string {
  try {
    const data = carregarTrilhas();
    
    const trilhasEncontradas = data.trilhas.filter(trilha => 
      trilha.tecnologia.toLowerCase().includes(tecnologia.toLowerCase()) ||
      trilha.nome.toLowerCase().includes(tecnologia.toLowerCase())
    );

    if (trilhasEncontradas.length === 0) {
      return `❌ Nenhuma trilha encontrada para a tecnologia: **${tecnologia}**\n\n` +
             `💡 Tecnologias disponíveis: Python, Java, JavaScript, React, Angular, Node.js, DevOps, AWS, Azure, Kotlin, Swift, Flutter, Go, Rust, PHP, Ruby, C#, Vue.js, Unity, Blockchain, e mais!`;
    }

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

      if (index < trilhasEncontradas.length - 1) {
        resultado += `---\n\n`;
      }
    });

    return resultado;
  } catch (error) {
    return `❌ Erro ao carregar as trilhas: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
  }
}

/**
 * Gera um desafio de código
 */
export function gerarDesafio(tecnologia: string, nivel: string = 'todos'): string {
  try {
    const data = carregarTrilhas();
    
    const trilhaEncontrada = data.trilhas.find(trilha => 
      trilha.tecnologia.toLowerCase() === tecnologia.toLowerCase() ||
      trilha.nome.toLowerCase().includes(tecnologia.toLowerCase())
    );

    if (!trilhaEncontrada) {
      return `❌ Tecnologia não encontrada: **${tecnologia}**\n\n` +
             `💡 Use a ferramenta \`listar_tecnologias\` para ver as opções disponíveis.`;
    }

    const desafio: Desafio = {
      titulo: `Projeto Prático em ${trilhaEncontrada.tecnologia}`,
      descricao: `Desenvolva uma aplicação completa utilizando ${trilhaEncontrada.tecnologia} aplicando as melhores práticas e padrões de projeto.`,
      dificuldade: nivel === 'todos' ? 'Intermediário' : nivel,
      pontos: nivel === 'Básico' ? 100 : nivel === 'Intermediário' ? 250 : 500,
      requisitos: [
        `Implementar funcionalidades core em ${trilhaEncontrada.tecnologia}`,
        'Seguir padrões de código limpo',
        'Adicionar tratamento de erros',
        'Documentar o código',
        'Criar testes unitários'
      ],
      dicas: [
        `Consulte a documentação oficial de ${trilhaEncontrada.tecnologia}`,
        'Divida o problema em partes menores',
        'Teste incrementalmente',
        'Peça feedback da comunidade'
      ],
      exemplos: [
        { entrada: 'Funcionalidade principal', saida: 'Resultado esperado conforme requisitos' }
      ]
    };

    let resultado = `# 🎯 Desafio de Código - ${trilhaEncontrada.tecnologia}\n\n`;
    resultado += `## ${desafio.titulo}\n\n`;
    resultado += `**Dificuldade:** ${desafio.dificuldade} | **Pontos:** ${desafio.pontos} XP\n\n`;
    resultado += `---\n\n`;
    resultado += `### 📝 Descrição\n\n`;
    resultado += `${desafio.descricao}\n\n`;
    
    resultado += `### ✅ Requisitos\n\n`;
    desafio.requisitos.forEach((req, index) => {
      resultado += `${index + 1}. ${req}\n`;
    });
    resultado += `\n`;

    resultado += `### 💡 Dicas\n\n`;
    desafio.dicas.forEach(dica => {
      resultado += `- 💭 ${dica}\n`;
    });
    resultado += `\n`;

    resultado += `### 🏆 Recompensas\n\n`;
    resultado += `- ⭐ ${desafio.pontos} XP ao completar\n`;
    resultado += `- 🎖️ Badge de conclusão\n`;
    resultado += `- 📈 Progresso na trilha ${trilhaEncontrada.nome}\n\n`;

    return resultado;
  } catch (error) {
    return `❌ Erro ao gerar desafio: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
  }
}

/**
 * Gera um certificado de conclusão
 */
export function gerarCertificado(nomeUsuario: string, tecnologia: string): string {
  try {
    if (!nomeUsuario || nomeUsuario.trim().length === 0) {
      return `❌ Por favor, forneça seu nome.`;
    }

    const data = carregarTrilhas();
    
    const trilhaEncontrada = data.trilhas.find(trilha => 
      trilha.tecnologia.toLowerCase() === tecnologia.toLowerCase() ||
      trilha.nome.toLowerCase().includes(tecnologia.toLowerCase())
    );

    if (!trilhaEncontrada) {
      return `❌ Trilha não encontrada para: **${tecnologia}**\n\n` +
             `💡 Use a ferramenta \`listar_tecnologias\` para ver as opções disponíveis.`;
    }

    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = meses[dataAtual.getMonth()];
    const ano = dataAtual.getFullYear();
    const dataEmissao = `${dia} de ${mes} de ${ano}`;
    
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    const codigoCertificado = `DIO-${timestamp}-${random}`;
    
    const cargaHoraria = trilhaEncontrada.numeroModulos * 2.5;

    // Criar diretório de certificados se não existir
    const certDir = path.join(__dirname, '../../docs/certificados-emitidos');
    if (!fs.existsSync(certDir)) {
      fs.mkdirSync(certDir, { recursive: true });
    }

    let certificado = `---\n`;
    certificado += `title: Certificado de Conclusão\n`;
    certificado += `student: ${nomeUsuario}\n`;
    certificado += `course: ${trilhaEncontrada.nome}\n`;
    certificado += `date: ${dataEmissao}\n`;
    certificado += `code: ${codigoCertificado}\n`;
    certificado += `---\n\n`;
    
    certificado += `<div align="center">\n\n`;
    certificado += `# 🎓 CERTIFICADO DE CONCLUSÃO\n\n`;
    certificado += `---\n\n`;
    certificado += `## Digital Innovation One\n\n`;
    certificado += `### Plataforma de Educação em Tecnologia\n\n`;
    certificado += `---\n\n`;
    certificado += `</div>\n\n`;
    
    certificado += `<br>\n\n`;
    certificado += `<div align="center">\n\n`;
    certificado += `## Certificamos que\n\n`;
    certificado += `# **${nomeUsuario.toUpperCase()}**\n\n`;
    certificado += `</div>\n\n`;
    certificado += `<br>\n\n`;
    
    certificado += `<div align="center">\n\n`;
    certificado += `Concluiu com êxito a formação\n\n`;
    certificado += `## **${trilhaEncontrada.nome}**\n\n`;
    certificado += `</div>\n\n`;
    certificado += `<br>\n\n`;
    
    certificado += `---\n\n`;
    certificado += `### 📊 Detalhes da Formação\n\n`;
    certificado += `| Informação | Detalhes |\n`;
    certificado += `|------------|----------|\n`;
    certificado += `| **Tecnologia** | ${trilhaEncontrada.tecnologia} |\n`;
    certificado += `| **Nível** | ${trilhaEncontrada.nivel} |\n`;
    certificado += `| **Módulos Concluídos** | ${trilhaEncontrada.numeroModulos} |\n`;
    certificado += `| **Carga Horária** | ${cargaHoraria} horas |\n`;
    certificado += `| **XP Conquistado** | ${trilhaEncontrada.xpTotal.toLocaleString('pt-BR')} pontos |\n`;
    certificado += `| **Data de Conclusão** | ${dataEmissao} |\n\n`;
    
    certificado += `---\n\n`;
    certificado += `<div align="center">\n\n`;
    certificado += `### 📜 Código de Verificação\n\n`;
    certificado += `\`\`\`\n`;
    certificado += `${codigoCertificado}\n`;
    certificado += `\`\`\`\n\n`;
    certificado += `</div>\n`;

    // Salvar certificado
    const nomeArquivo = `certificado_${nomeUsuario.replace(/\s+/g, '_')}_${trilhaEncontrada.tecnologia}_${Date.now()}.md`;
    const caminhoArquivo = path.join(certDir, nomeArquivo);
    fs.writeFileSync(caminhoArquivo, certificado, 'utf-8');

    let resultado = `# ✅ Certificado Gerado com Sucesso!\n\n`;
    resultado += `🎉 **Parabéns, ${nomeUsuario}!**\n\n`;
    resultado += `Seu certificado de conclusão da formação **${trilhaEncontrada.nome}** foi gerado!\n\n`;
    resultado += `---\n\n`;
    resultado += `### 📄 Informações do Certificado\n\n`;
    resultado += `- **Aluno:** ${nomeUsuario}\n`;
    resultado += `- **Formação:** ${trilhaEncontrada.nome}\n`;
    resultado += `- **Tecnologia:** ${trilhaEncontrada.tecnologia}\n`;
    resultado += `- **Carga Horária:** ${cargaHoraria} horas\n`;
    resultado += `- **Código:** \`${codigoCertificado}\`\n`;
    resultado += `- **Arquivo:** \`${caminhoArquivo}\`\n\n`;

    return resultado;
  } catch (error) {
    return `❌ Erro ao gerar certificado: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
  }
}

// Made with Bob
