# 🚀 Projeto Final - Formação IBM com Bob (DIO)

Projeto final da Formação IBM com Bob da Digital Innovation One (DIO), incluindo um sistema completo de comandos slash para exploração de trilhas, desafios e certificados.

> 📚 **[Documentação Completa do Projeto](DOCUMENTACAO_COMPLETA_PROJETO.md)** | 🗺️ **[Índice Visual](INDICE_VISUAL_PROJETO.md)**

## 📋 Sobre o Projeto

Este projeto integra:
- 🤖 **MCP Server GitHub** - Servidor de integração com GitHub
- 🎯 **DIO Explorer** - Sistema de comandos slash para a plataforma DIO
- 📚 **Base de Dados** - 32 trilhas de tecnologia com informações detalhadas

## ⚡ Comandos Slash Disponíveis

Este projeto possui **3 comandos slash personalizados** que você pode usar diretamente no chat do Bob!

### 1️⃣ `/trilha <tecnologia>`
Exibe o plano de estudos completo de uma trilha da DIO.

```bash
/trilha Python
/trilha JavaScript
/trilha React
```

### 2️⃣ `/desafio <tecnologia> [nivel]`
Gera um desafio de código aleatório baseado na tecnologia e nível.

```bash
/desafio Python
/desafio JavaScript Intermediário
/desafio Java Avançado
```

**Níveis disponíveis:** Básico, Intermediário, Avançado

### 3️⃣ `/certificado "<nome>" "<tecnologia>"`
Gera um certificado fictício de conclusão em formato Markdown.

```bash
/certificado "João Silva" "Python"
/certificado "Maria Santos" "JavaScript"
```

⚠️ **Importante:** Use aspas duplas para nome e tecnologia!

## 📚 Tecnologias Suportadas

O sistema suporta mais de 30 tecnologias:

**Linguagens:** Python • Java • JavaScript • TypeScript • C# • PHP • Ruby • Go • Rust • Kotlin • Swift

**Frameworks:** React • Angular • Vue.js • Node.js • Spring • Laravel • Rails • Flutter • Unity

**Cloud & DevOps:** AWS • Azure • DevOps • Docker • Kubernetes

**Especialidades:** Data Science • Machine Learning • Blockchain • Cybersecurity • QA • UX/UI Design

## 🗂️ Estrutura do Projeto

```
projeto_final_dio_formacao_bob/
├── .bob/                                    # Configurações do Bob
│   ├── slash-commands.json                  # Registro de comandos slash
│   ├── slash-commands-handler.ts            # Handler de integração
│   ├── SLASH_COMMANDS_README.md             # Documentação completa
│   └── test-slash-commands.ts               # Script de testes
│
├── projeto_final_dio_formacao_bob/
│   └── dio_explorer/                        # Sistema DIO Explorer
│       ├── commands/                        # Implementação dos comandos
│       │   ├── index.ts                     # Processador principal
│       │   ├── trilha.ts                    # Comando /trilha
│       │   ├── desafio.ts                   # Comando /desafio
│       │   └── certificado.ts               # Comando /certificado
│       ├── data/
│       │   └── trilhas_dio.json             # Base de dados (32 trilhas)
│       ├── docs/
│       │   └── certificados-emitidos/       # Certificados gerados
│       └── README.md                        # Documentação do DIO Explorer
│
├── src/                                     # MCP Server GitHub
│   ├── index.ts
│   ├── server.ts
│   └── ...
│
├── COMANDOS_SLASH.md                        # Guia rápido de comandos
└── README.md                                # Este arquivo
```

## 🚀 Como Usar

### No Chat do Bob

1. Abra o chat do Bob neste projeto
2. Digite qualquer um dos comandos slash
3. Pressione Enter e veja o resultado!

**Exemplo:**
```
/trilha Python
```

### Localmente (Testes)

```bash
# Navegar até o diretório do DIO Explorer
cd projeto_final_dio_formacao_bob/dio_explorer

# Instalar dependências (se necessário)
npm install

# Executar testes
npm run test

# Ou executar exemplo
npm run exemplo
```

### Testar Comandos Slash

```bash
# Executar script de teste
ts-node .bob/test-slash-commands.ts
```

## 📖 Documentação

- 📁 **[COMANDOS_SLASH.md](COMANDOS_SLASH.md)** - Guia rápido de uso
- 📁 **[.bob/SLASH_COMMANDS_README.md](.bob/SLASH_COMMANDS_README.md)** - Documentação completa dos comandos
- 📁 **[projeto_final_dio_formacao_bob/dio_explorer/README.md](projeto_final_dio_formacao_bob/dio_explorer/README.md)** - Documentação do DIO Explorer
- 📁 **[projeto_final_dio_formacao_bob/dio_explorer/EXEMPLOS.md](projeto_final_dio_formacao_bob/dio_explorer/EXEMPLOS.md)** - Exemplos práticos

## 🎓 Exemplo Completo de Uso

### Cenário: Aprender Python do Zero

**Passo 1 - Explorar a trilha:**
```
/trilha Python
```
Você verá:
- 📊 12 módulos de conteúdo
- 🏆 3 badges disponíveis
- 🎥 3 lives ao vivo
- 📝 Plano de estudos em 3 fases
- ⭐ 15.000 XP total

**Passo 2 - Praticar com desafio:**
```
/desafio Python Básico
```
Receberá um desafio como "Calculadora de Fibonacci" com:
- 📝 Descrição detalhada
- ✅ Requisitos técnicos
- 💡 Dicas de implementação
- 📊 Exemplos de teste
- 🏆 100 XP de recompensa

**Passo 3 - Gerar certificado:**
```
/certificado "Seu Nome Completo" "Python"
```
Gerará um certificado com:
- 🎓 Certificado completo em Markdown
- 📜 Código de verificação único
- 📊 Detalhes da formação (25 horas)
- 🏆 Competências desenvolvidas
- 💾 Arquivo salvo automaticamente

## 🔧 Funcionalidades

### Comando `/trilha`
- ✅ Busca flexível por tecnologia ou nome
- ✅ Informações detalhadas da formação
- ✅ Plano de estudos em 3 fases
- ✅ Badges e conquistas
- ✅ Lives ao vivo programadas
- ✅ Promoções ativas

### Comando `/desafio`
- ✅ Desafios específicos por tecnologia
- ✅ 3 níveis de dificuldade
- ✅ Requisitos detalhados
- ✅ Dicas de implementação
- ✅ Exemplos práticos
- ✅ Sistema de pontuação XP

### Comando `/certificado`
- ✅ Certificado completo em Markdown
- ✅ Código de verificação único
- ✅ Informações da formação
- ✅ Competências desenvolvidas
- ✅ Badges conquistadas
- ✅ Salvamento automático

## 💡 Dicas de Uso

1. **Busca Flexível:** O comando `/trilha` aceita variações
   - `/trilha Python` ou `/trilha Data Science`

2. **Nível Opcional:** No `/desafio`, o nível é opcional
   - `/desafio Python` (qualquer nível)
   - `/desafio Python Básico` (apenas básico)

3. **Aspas Obrigatórias:** No `/certificado`, use aspas duplas
   - ✅ `/certificado "João Silva" "Python"`
   - ❌ `/certificado João Silva Python`

4. **Case Insensitive:** Comandos não diferenciam maiúsculas
   - `/trilha python` = `/trilha Python`

## 🛠️ Tecnologias Utilizadas

- **TypeScript** - Linguagem principal
- **Node.js** - Runtime
- **MCP (Model Context Protocol)** - Protocolo de integração
- **Bob AI** - Assistente de desenvolvimento
- **JSON** - Base de dados

## 📝 Notas

- ✅ Comandos funcionam apenas neste projeto
- ✅ Certificados são fictícios (fins educacionais)
- ✅ Desafios são exemplos práticos
- ✅ Trilhas baseadas em dados simulados da DIO
- ✅ Todos os comandos retornam Markdown formatado

## 🤝 Contribuindo

Este é um projeto educacional desenvolvido como parte da Formação IBM com Bob da DIO.

## 📄 Licença

MIT License - Projeto educacional da Digital Innovation One

---

<div align="center">

**Desenvolvido com ❤️ para o Projeto Final da Formação IBM com Bob - DIO**

🚀 **Comece agora! Digite `/trilha Python` no chat do Bob!** 🚀

</div>