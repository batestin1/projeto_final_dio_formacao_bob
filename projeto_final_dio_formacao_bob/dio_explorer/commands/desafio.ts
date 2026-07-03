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

interface Desafio {
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

const desafiosPorTecnologia: { [key: string]: Desafio[] } = {
  'Python': [
    {
      titulo: 'Calculadora de Fibonacci',
      descricao: 'Crie uma função que retorne o n-ésimo número da sequência de Fibonacci usando recursão ou iteração.',
      dificuldade: 'Básico',
      pontos: 100,
      requisitos: ['Função que recebe um número inteiro n', 'Retorna o n-ésimo número de Fibonacci', 'Trate casos especiais (n <= 0)'],
      dicas: ['Fibonacci: F(n) = F(n-1) + F(n-2)', 'F(0) = 0, F(1) = 1', 'Considere usar memoization para otimizar'],
      exemplos: [
        { entrada: 'fibonacci(5)', saida: '5' },
        { entrada: 'fibonacci(10)', saida: '55' }
      ]
    },
    {
      titulo: 'Analisador de Dados CSV',
      descricao: 'Desenvolva um programa que leia um arquivo CSV e calcule estatísticas básicas (média, mediana, moda).',
      dificuldade: 'Intermediário',
      pontos: 250,
      requisitos: ['Leitura de arquivo CSV', 'Cálculo de média, mediana e moda', 'Tratamento de dados inválidos', 'Exportação de relatório'],
      dicas: ['Use a biblioteca pandas ou csv', 'Valide os dados antes de processar', 'Considere usar numpy para cálculos'],
      exemplos: [
        { entrada: 'dados.csv com [10, 20, 30, 40, 50]', saida: 'Média: 30, Mediana: 30, Moda: N/A' }
      ]
    },
    {
      titulo: 'Sistema de Recomendação',
      descricao: 'Implemente um sistema de recomendação básico usando similaridade de cosseno e filtragem colaborativa.',
      dificuldade: 'Avançado',
      pontos: 500,
      requisitos: ['Matriz de usuários x itens', 'Cálculo de similaridade', 'Geração de recomendações', 'API REST para consultas'],
      dicas: ['Use scikit-learn para cálculos', 'Normalize os dados', 'Implemente cache para performance'],
      exemplos: [
        { entrada: 'usuario_id: 123', saida: 'Recomendações: [item_45, item_78, item_12]' }
      ]
    }
  ],
  'JavaScript': [
    {
      titulo: 'Validador de Formulário',
      descricao: 'Crie um validador de formulário que verifique email, senha forte e CPF.',
      dificuldade: 'Básico',
      pontos: 100,
      requisitos: ['Validação de email com regex', 'Senha com 8+ caracteres, maiúsculas, números', 'Validação de CPF', 'Mensagens de erro claras'],
      dicas: ['Use expressões regulares', 'Implemente validação em tempo real', 'Adicione feedback visual'],
      exemplos: [
        { entrada: 'email: "teste@email.com"', saida: 'Válido ✓' },
        { entrada: 'senha: "123"', saida: 'Inválido: senha muito curta' }
      ]
    },
    {
      titulo: 'To-Do List com LocalStorage',
      descricao: 'Desenvolva uma aplicação de lista de tarefas com persistência local e filtros.',
      dificuldade: 'Intermediário',
      pontos: 250,
      requisitos: ['CRUD completo de tarefas', 'Persistência com localStorage', 'Filtros (todas, ativas, concluídas)', 'Drag and drop para reordenar'],
      dicas: ['Use eventos do DOM', 'Implemente debounce para salvar', 'Adicione animações CSS'],
      exemplos: [
        { entrada: 'Adicionar tarefa "Estudar JavaScript"', saida: 'Tarefa adicionada e salva' }
      ]
    },
    {
      titulo: 'Chat em Tempo Real',
      descricao: 'Implemente um sistema de chat usando WebSockets com salas e notificações.',
      dificuldade: 'Avançado',
      pontos: 500,
      requisitos: ['WebSocket server e client', 'Múltiplas salas de chat', 'Notificações push', 'Histórico de mensagens', 'Indicador de digitação'],
      dicas: ['Use Socket.io ou ws', 'Implemente autenticação', 'Adicione rate limiting'],
      exemplos: [
        { entrada: 'Usuário envia mensagem', saida: 'Mensagem entregue em tempo real para todos na sala' }
      ]
    }
  ],
  'Java': [
    {
      titulo: 'Sistema de Banco Simples',
      descricao: 'Crie um sistema bancário com contas, depósitos, saques e transferências usando POO.',
      dificuldade: 'Básico',
      pontos: 100,
      requisitos: ['Classes Conta, Cliente, Banco', 'Operações básicas (depósito, saque, transferência)', 'Validação de saldo', 'Histórico de transações'],
      dicas: ['Use encapsulamento', 'Implemente interfaces', 'Adicione tratamento de exceções'],
      exemplos: [
        { entrada: 'conta.depositar(100)', saida: 'Saldo: R$ 100,00' },
        { entrada: 'conta.sacar(150)', saida: 'Erro: Saldo insuficiente' }
      ]
    },
    {
      titulo: 'API REST com Spring Boot',
      descricao: 'Desenvolva uma API REST completa para gerenciamento de produtos com CRUD e paginação.',
      dificuldade: 'Intermediário',
      pontos: 250,
      requisitos: ['Endpoints CRUD', 'Validação de dados', 'Paginação e ordenação', 'Tratamento de erros', 'Documentação Swagger'],
      dicas: ['Use Spring Data JPA', 'Implemente DTOs', 'Adicione testes unitários'],
      exemplos: [
        { entrada: 'GET /api/produtos?page=0&size=10', saida: 'Lista paginada de produtos' }
      ]
    },
    {
      titulo: 'Sistema de Microserviços',
      descricao: 'Implemente uma arquitetura de microserviços com service discovery e circuit breaker.',
      dificuldade: 'Avançado',
      pontos: 500,
      requisitos: ['Múltiplos microserviços', 'Eureka para service discovery', 'Resilience4j para circuit breaker', 'API Gateway', 'Distributed tracing'],
      dicas: ['Use Spring Cloud', 'Implemente health checks', 'Adicione monitoramento'],
      exemplos: [
        { entrada: 'Requisição ao gateway', saida: 'Roteada para microserviço apropriado com fallback' }
      ]
    }
  ],
  'React': [
    {
      titulo: 'Contador com Hooks',
      descricao: 'Crie um contador interativo usando useState e useEffect com persistência.',
      dificuldade: 'Básico',
      pontos: 100,
      requisitos: ['Botões incrementar/decrementar', 'Persistência com localStorage', 'Reset do contador', 'Animações de transição'],
      dicas: ['Use useState para estado', 'useEffect para side effects', 'Adicione PropTypes'],
      exemplos: [
        { entrada: 'Click em incrementar', saida: 'Contador aumenta e salva no localStorage' }
      ]
    },
    {
      titulo: 'Dashboard com Gráficos',
      descricao: 'Desenvolva um dashboard com gráficos interativos e filtros usando Context API.',
      dificuldade: 'Intermediário',
      pontos: 250,
      requisitos: ['Múltiplos tipos de gráficos', 'Filtros dinâmicos', 'Context API para estado global', 'Responsivo', 'Exportação de dados'],
      dicas: ['Use Chart.js ou Recharts', 'Implemente custom hooks', 'Otimize re-renders'],
      exemplos: [
        { entrada: 'Selecionar período', saida: 'Gráficos atualizados com dados filtrados' }
      ]
    },
    {
      titulo: 'E-commerce com Redux',
      descricao: 'Implemente um e-commerce completo com carrinho, checkout e integração de pagamento.',
      dificuldade: 'Avançado',
      pontos: 500,
      requisitos: ['Redux para estado global', 'Carrinho de compras', 'Checkout multi-etapas', 'Integração com API de pagamento', 'Autenticação JWT'],
      dicas: ['Use Redux Toolkit', 'Implemente middleware', 'Adicione testes com Jest'],
      exemplos: [
        { entrada: 'Adicionar produto ao carrinho', saida: 'Estado global atualizado e persistido' }
      ]
    }
  ]
};

function gerarDesafioAleatorio(tecnologia: string, nivel: string): string {
  try {
    // Carregar trilhas para validar tecnologia
    const dataPath = path.join(__dirname, '../data/trilhas_dio.json');
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    const data: TrilhasData = JSON.parse(jsonData);

    // Buscar tecnologia correspondente
    const trilhaEncontrada = data.trilhas.find(trilha => 
      trilha.tecnologia.toLowerCase() === tecnologia.toLowerCase() ||
      trilha.nome.toLowerCase().includes(tecnologia.toLowerCase())
    );

    if (!trilhaEncontrada) {
      return `❌ Tecnologia não encontrada: **${tecnologia}**\n\n` +
             `💡 Tecnologias disponíveis: Python, Java, JavaScript, React, Angular, Node.js, DevOps, AWS, e mais!\n\n` +
             `Use \`/trilha <tecnologia>\` para ver as trilhas disponíveis.`;
    }

    // Buscar desafios para a tecnologia
    let desafiosDisponiveis = desafiosPorTecnologia[trilhaEncontrada.tecnologia] || [];
    
    // Se não houver desafios específicos, gerar um genérico
    if (desafiosDisponiveis.length === 0) {
      desafiosDisponiveis = gerarDesafioGenerico(trilhaEncontrada.tecnologia, nivel);
    }

    // Filtrar por nível se especificado
    if (nivel && nivel.toLowerCase() !== 'todos') {
      desafiosDisponiveis = desafiosDisponiveis.filter(d => 
        d.dificuldade.toLowerCase() === nivel.toLowerCase()
      );
    }

    if (desafiosDisponiveis.length === 0) {
      return `❌ Nenhum desafio encontrado para **${tecnologia}** no nível **${nivel}**\n\n` +
             `💡 Níveis disponíveis: Básico, Intermediário, Avançado`;
    }

    // Selecionar desafio aleatório
    const desafio = desafiosDisponiveis[Math.floor(Math.random() * desafiosDisponiveis.length)];

    // Formatar saída
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

    resultado += `### 📊 Exemplos\n\n`;
    desafio.exemplos.forEach((exemplo, index) => {
      resultado += `**Exemplo ${index + 1}:**\n`;
      resultado += `\`\`\`\n`;
      resultado += `Entrada: ${exemplo.entrada}\n`;
      resultado += `Saída: ${exemplo.saida}\n`;
      resultado += `\`\`\`\n\n`;
    });

    resultado += `### 🏆 Recompensas\n\n`;
    resultado += `- ⭐ ${desafio.pontos} XP ao completar\n`;
    resultado += `- 🎖️ Badge de conclusão\n`;
    resultado += `- 📈 Progresso na trilha ${trilhaEncontrada.nome}\n\n`;

    resultado += `### 🚀 Próximos Passos\n\n`;
    resultado += `1. Leia atentamente os requisitos\n`;
    resultado += `2. Planeje sua solução\n`;
    resultado += `3. Implemente o código\n`;
    resultado += `4. Teste com os exemplos fornecidos\n`;
    resultado += `5. Submeta sua solução na plataforma DIO\n\n`;

    resultado += `💪 **Boa sorte!** Use \`/desafio ${tecnologia} ${nivel}\` para gerar outro desafio.`;

    return resultado;

  } catch (error) {
    return `❌ Erro ao gerar desafio: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
  }
}

function gerarDesafioGenerico(tecnologia: string, nivel: string): Desafio[] {
  const nivelSelecionado = nivel || 'Básico';
  const pontos = nivelSelecionado === 'Básico' ? 100 : nivelSelecionado === 'Intermediário' ? 250 : 500;

  return [{
    titulo: `Projeto Prático em ${tecnologia}`,
    descricao: `Desenvolva uma aplicação completa utilizando ${tecnologia} aplicando as melhores práticas e padrões de projeto.`,
    dificuldade: nivelSelecionado,
    pontos: pontos,
    requisitos: [
      `Implementar funcionalidades core em ${tecnologia}`,
      'Seguir padrões de código limpo',
      'Adicionar tratamento de erros',
      'Documentar o código',
      'Criar testes unitários'
    ],
    dicas: [
      `Consulte a documentação oficial de ${tecnologia}`,
      'Divida o problema em partes menores',
      'Teste incrementalmente',
      'Peça feedback da comunidade'
    ],
    exemplos: [
      { entrada: 'Funcionalidade principal', saida: 'Resultado esperado conforme requisitos' }
    ]
  }];
}

export function executarComandoDesafio(tecnologia: string, nivel: string = 'todos'): string {
  return gerarDesafioAleatorio(tecnologia, nivel);
}

// Made with Bob
