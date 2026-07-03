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

function gerarDataAtual(): string {
  const meses = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];
  
  const data = new Date();
  const dia = data.getDate();
  const mes = meses[data.getMonth()];
  const ano = data.getFullYear();
  
  return `${dia} de ${mes} de ${ano}`;
}

function gerarCodigoCertificado(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `DIO-${timestamp}-${random}`;
}

function calcularCargaHoraria(numeroModulos: number): number {
  // Estimativa: cada módulo tem aproximadamente 2-3 horas
  return numeroModulos * 2.5;
}

export function executarComandoCertificado(nomeUsuario: string, tecnologia: string): string {
  try {
    // Validar nome do usuário
    if (!nomeUsuario || nomeUsuario.trim().length === 0) {
      return `❌ Por favor, forneça seu nome.\n\n` +
             `**Uso correto:** \`/certificado "Seu Nome" "Tecnologia"\`\n\n` +
             `**Exemplo:** \`/certificado "João Silva" "Python"\``;
    }

    // Carregar o arquivo JSON
    const dataPath = path.join(__dirname, '../data/trilhas_dio.json');
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    const data: TrilhasData = JSON.parse(jsonData);

    // Buscar trilha correspondente
    const trilhaEncontrada = data.trilhas.find(trilha => 
      trilha.tecnologia.toLowerCase() === tecnologia.toLowerCase() ||
      trilha.nome.toLowerCase().includes(tecnologia.toLowerCase())
    );

    if (!trilhaEncontrada) {
      return `❌ Trilha não encontrada para: **${tecnologia}**\n\n` +
             `💡 Use \`/trilha <tecnologia>\` para ver as trilhas disponíveis.\n\n` +
             `**Tecnologias disponíveis:** Python, Java, JavaScript, React, Angular, Node.js, DevOps, AWS, Azure, e mais!`;
    }

    // Gerar dados do certificado
    const dataEmissao = gerarDataAtual();
    const codigoCertificado = gerarCodigoCertificado();
    const cargaHoraria = calcularCargaHoraria(trilhaEncontrada.numeroModulos);

    // Criar diretório de certificados se não existir
    const certDir = path.join(__dirname, '../docs/certificados-emitidos');
    if (!fs.existsSync(certDir)) {
      fs.mkdirSync(certDir, { recursive: true });
    }

    // Gerar certificado em Markdown
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
    certificado += `### 🏆 Competências Desenvolvidas\n\n`;
    trilhaEncontrada.badgesDisponiveis.forEach((badge, index) => {
      certificado += `${index + 1}. **${badge}**\n`;
    });
    certificado += `\n`;
    
    certificado += `---\n\n`;
    certificado += `### 🎯 Conquistas\n\n`;
    certificado += `- ✅ Completou ${trilhaEncontrada.numeroModulos} módulos de aprendizado\n`;
    certificado += `- ✅ Participou de ${trilhaEncontrada.livesAoVivo.length} lives ao vivo\n`;
    certificado += `- ✅ Conquistou ${trilhaEncontrada.badgesDisponiveis.length} badges\n`;
    certificado += `- ✅ Acumulou ${trilhaEncontrada.xpTotal.toLocaleString('pt-BR')} pontos de experiência\n`;
    certificado += `- ✅ Desenvolveu projetos práticos\n\n`;
    
    certificado += `---\n\n`;
    certificado += `<div align="center">\n\n`;
    certificado += `### 📜 Código de Verificação\n\n`;
    certificado += `\`\`\`\n`;
    certificado += `${codigoCertificado}\n`;
    certificado += `\`\`\`\n\n`;
    certificado += `*Este certificado pode ser verificado em: https://dio.me/certificados/${codigoCertificado}*\n\n`;
    certificado += `</div>\n\n`;
    
    certificado += `---\n\n`;
    certificado += `<div align="center">\n\n`;
    certificado += `### 🌟 Assinaturas\n\n`;
    certificado += `**Digital Innovation One**\n\n`;
    certificado += `*Plataforma de Educação em Tecnologia*\n\n`;
    certificado += `---\n\n`;
    certificado += `**Emitido em:** ${dataEmissao}\n\n`;
    certificado += `**Válido em todo território nacional**\n\n`;
    certificado += `</div>\n\n`;
    
    certificado += `---\n\n`;
    certificado += `<div align="center">\n\n`;
    certificado += `### 💼 Compartilhe sua conquista!\n\n`;
    certificado += `[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com)\n`;
    certificado += `[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com)\n`;
    certificado += `[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com)\n\n`;
    certificado += `</div>\n\n`;
    
    certificado += `---\n\n`;
    certificado += `<div align="center">\n\n`;
    certificado += `*"O conhecimento é a única riqueza que aumenta quando compartilhada"*\n\n`;
    certificado += `**Parabéns pela sua dedicação e conquista! 🎉**\n\n`;
    certificado += `</div>\n`;

    // Salvar certificado em arquivo
    const nomeArquivo = `certificado_${nomeUsuario.replace(/\s+/g, '_')}_${trilhaEncontrada.tecnologia}_${Date.now()}.md`;
    const caminhoArquivo = path.join(certDir, nomeArquivo);
    fs.writeFileSync(caminhoArquivo, certificado, 'utf-8');

    // Retornar mensagem de sucesso com preview
    let resultado = `# ✅ Certificado Gerado com Sucesso!\n\n`;
    resultado += `🎉 **Parabéns, ${nomeUsuario}!**\n\n`;
    resultado += `Seu certificado de conclusão da formação **${trilhaEncontrada.nome}** foi gerado com sucesso!\n\n`;
    resultado += `---\n\n`;
    resultado += `### 📄 Informações do Certificado\n\n`;
    resultado += `- **Aluno:** ${nomeUsuario}\n`;
    resultado += `- **Formação:** ${trilhaEncontrada.nome}\n`;
    resultado += `- **Tecnologia:** ${trilhaEncontrada.tecnologia}\n`;
    resultado += `- **Nível:** ${trilhaEncontrada.nivel}\n`;
    resultado += `- **Carga Horária:** ${cargaHoraria} horas\n`;
    resultado += `- **Data de Emissão:** ${dataEmissao}\n`;
    resultado += `- **Código:** \`${codigoCertificado}\`\n\n`;
    resultado += `---\n\n`;
    resultado += `### 💾 Arquivo Salvo\n\n`;
    resultado += `📁 **Local:** \`${caminhoArquivo}\`\n\n`;
    resultado += `Você pode abrir o arquivo para visualizar o certificado completo em formato Markdown.\n\n`;
    resultado += `---\n\n`;
    resultado += `### 🎯 Próximos Passos\n\n`;
    resultado += `1. ✅ Abra o arquivo do certificado\n`;
    resultado += `2. 📤 Compartilhe nas redes sociais\n`;
    resultado += `3. 💼 Adicione ao seu LinkedIn\n`;
    resultado += `4. 📚 Continue aprendendo com \`/trilha <tecnologia>\`\n`;
    resultado += `5. 🏆 Desafie-se com \`/desafio <tecnologia> <nível>\`\n\n`;
    resultado += `---\n\n`;
    resultado += `### 🌟 Conquistas Desbloqueadas\n\n`;
    trilhaEncontrada.badgesDisponiveis.forEach(badge => {
      resultado += `- 🎖️ ${badge}\n`;
    });
    resultado += `\n`;
    resultado += `**Total de XP:** ${trilhaEncontrada.xpTotal.toLocaleString('pt-BR')} pontos 🚀\n\n`;
    resultado += `---\n\n`;
    resultado += `🎊 **Parabéns pela sua dedicação e conquista!**\n\n`;
    resultado += `Continue sua jornada de aprendizado na DIO! 💪`;

    return resultado;

  } catch (error) {
    return `❌ Erro ao gerar certificado: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
  }
}

// Made with Bob
