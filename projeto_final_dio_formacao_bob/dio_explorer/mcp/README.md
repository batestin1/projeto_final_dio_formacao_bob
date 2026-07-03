# 🚀 DIO Explorer MCP Server

Servidor MCP (Model Context Protocol) para acesso às funcionalidades do DIO Explorer via API, HTTPS e SSO.

## 📋 Sobre

Este servidor MCP permite que aplicações e agentes de IA acessem as funcionalidades do DIO Explorer de forma programática, incluindo:

- 🎯 Busca de trilhas de aprendizado
- 💻 Geração de desafios de código
- 🎓 Emissão de certificados
- 📚 Listagem de tecnologias disponíveis

## 🛠️ Instalação

```bash
cd projeto_final_dio_formacao_bob/dio_explorer/mcp
npm install
```

## 🏗️ Build

```bash
npm run build
```

## 🚀 Uso

### Modo Stdio (Padrão MCP)

```bash
npm start
```

Ou usando o executável diretamente:

```bash
node dist/index.js
```

### Integração com Bob (Roo-Cline)

Adicione ao seu arquivo de configuração MCP (`~/.bob/mcp-settings.json` ou similar):

```json
{
  "mcpServers": {
    "dio-explorer": {
      "command": "node",
      "args": [
        "/caminho/completo/para/projeto_final_dio_formacao_bob/dio_explorer/mcp/dist/index.js"
      ]
    }
  }
}
```

### Integração com Claude Desktop

Adicione ao arquivo `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "dio-explorer": {
      "command": "node",
      "args": [
        "/caminho/completo/para/projeto_final_dio_formacao_bob/dio_explorer/mcp/dist/index.js"
      ]
    }
  }
}
```

## 🔧 Ferramentas Disponíveis

### 1. `buscar_trilha`

Busca informações detalhadas sobre uma trilha de aprendizado.

**Parâmetros:**
- `tecnologia` (string, obrigatório): Nome da tecnologia (ex: "Python", "Java", "React")

**Exemplo:**
```json
{
  "name": "buscar_trilha",
  "arguments": {
    "tecnologia": "Python"
  }
}
```

### 2. `gerar_desafio`

Gera um desafio de código aleatório.

**Parâmetros:**
- `tecnologia` (string, obrigatório): Tecnologia do desafio
- `nivel` (string, opcional): "Básico", "Intermediário", "Avançado" ou "todos" (padrão)

**Exemplo:**
```json
{
  "name": "gerar_desafio",
  "arguments": {
    "tecnologia": "JavaScript",
    "nivel": "Intermediário"
  }
}
```

### 3. `gerar_certificado`

Gera um certificado de conclusão em formato Markdown.

**Parâmetros:**
- `nome` (string, obrigatório): Nome completo do aluno
- `tecnologia` (string, obrigatório): Tecnologia/trilha concluída

**Exemplo:**
```json
{
  "name": "gerar_certificado",
  "arguments": {
    "nome": "João Silva",
    "tecnologia": "Python"
  }
}
```

### 4. `listar_tecnologias`

Lista todas as tecnologias disponíveis.

**Parâmetros:** Nenhum

**Exemplo:**
```json
{
  "name": "listar_tecnologias",
  "arguments": {}
}
```

## 📁 Estrutura do Projeto

```
mcp/
├── src/
│   ├── index.ts          # Servidor MCP principal
│   ├── tools.ts          # Definições das ferramentas
│   ├── services.ts       # Lógica de negócio
│   └── types.ts          # Tipos TypeScript
├── dist/                 # Código compilado
├── package.json          # Dependências
├── tsconfig.json         # Configuração TypeScript
└── README.md            # Esta documentação
```

## 🔐 Segurança

- O servidor opera em modo stdio por padrão (comunicação segura via stdin/stdout)
- Não expõe portas de rede por padrão
- Validação de entrada usando Zod
- Tratamento robusto de erros

## 🌐 Acesso via API/HTTPS (Futuro)

Para habilitar acesso via API REST ou HTTPS:

1. Configure as variáveis de ambiente (crie um arquivo `.env` baseado em `.env.example`)
2. Implemente autenticação JWT
3. Configure CORS apropriadamente
4. Use HTTPS em produção

## 🔄 Desenvolvimento

### Modo Watch

```bash
npm run watch
```

### Modo Dev (com ts-node)

```bash
npm run dev
```

## 📝 Exemplos de Uso

### Com Bob/Roo-Cline

```
Usuário: "Busque informações sobre a trilha de Python"
Bob: [usa a ferramenta buscar_trilha com tecnologia="Python"]
```

### Com Claude Desktop

```
User: "Generate a JavaScript challenge at intermediate level"
Claude: [uses gerar_desafio tool with tecnologia="JavaScript", nivel="Intermediário"]
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes

## 🆘 Suporte

Para problemas ou dúvidas:
- Abra uma issue no GitHub
- Consulte a documentação do MCP: https://modelcontextprotocol.io
- Entre em contato com a equipe DIO

## 🎯 Roadmap

- [ ] Suporte a SSO (Google, GitHub, Microsoft)
- [ ] API REST com autenticação JWT
- [ ] WebSocket para notificações em tempo real
- [ ] Cache de dados para melhor performance
- [ ] Métricas e monitoramento
- [ ] Testes automatizados
- [ ] Docker container
- [ ] Documentação OpenAPI/Swagger

---

**Desenvolvido com ❤️ pela equipe DIO - Digital Innovation One**