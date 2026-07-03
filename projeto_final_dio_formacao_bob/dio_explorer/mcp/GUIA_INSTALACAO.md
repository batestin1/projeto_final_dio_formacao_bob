# 📦 Guia de Instalação e Configuração - DIO Explorer MCP Server

## 🎯 Pré-requisitos

- Node.js >= 18.0.0
- npm ou yarn
- Git (opcional)

## 📥 Instalação

### 1. Navegue até o diretório do MCP Server

```bash
cd projeto_final_dio_formacao_bob/dio_explorer/mcp
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Compile o projeto

```bash
npm run build
```

## 🔧 Configuração

### Integração com Bob (Roo-Cline)

1. Localize o arquivo de configuração MCP do Bob (geralmente em `~/.bob/mcp-settings.json`)

2. Adicione a seguinte configuração:

```json
{
  "mcpServers": {
    "dio-explorer": {
      "command": "node",
      "args": [
        "/caminho/absoluto/para/projeto_final_dio_formacao_bob/dio_explorer/mcp/dist/index.js"
      ]
    }
  }
}
```

**Importante:** Substitua `/caminho/absoluto/para/` pelo caminho completo no seu sistema.

### Integração com Claude Desktop

1. Localize o arquivo `claude_desktop_config.json`:
   - **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux:** `~/.config/Claude/claude_desktop_config.json`

2. Adicione a configuração:

```json
{
  "mcpServers": {
    "dio-explorer": {
      "command": "node",
      "args": [
        "/caminho/absoluto/para/projeto_final_dio_formacao_bob/dio_explorer/mcp/dist/index.js"
      ]
    }
  }
}
```

## ✅ Verificação da Instalação

### Teste Manual

Execute o servidor diretamente:

```bash
npm start
```

Você deve ver a mensagem:
```
DIO Explorer MCP Server iniciado com sucesso!
Ferramentas disponíveis:
  - buscar_trilha: Busca e retorna informações detalhadas sobre uma trilha...
  - gerar_desafio: Gera um desafio de código aleatório...
  - gerar_certificado: Gera um certificado de conclusão...
  - listar_tecnologias: Lista todas as tecnologias disponíveis...
```

### Teste com Bob/Claude

1. Reinicie o Bob ou Claude Desktop
2. Tente usar uma das ferramentas:
   - "Busque informações sobre a trilha de Python"
   - "Liste todas as tecnologias disponíveis"
   - "Gere um desafio de JavaScript nível intermediário"

## 🐛 Solução de Problemas

### Erro: "Cannot find module"

**Solução:** Certifique-se de ter executado `npm install` e `npm run build`

```bash
cd projeto_final_dio_formacao_bob/dio_explorer/mcp
npm install
npm run build
```

### Erro: "ENOENT: no such file or directory"

**Solução:** Verifique se o caminho no arquivo de configuração está correto e é absoluto.

Para obter o caminho absoluto:

```bash
# No diretório mcp
pwd
# Adicione /dist/index.js ao final
```

### Servidor não aparece no Bob/Claude

**Solução:**
1. Verifique se o arquivo de configuração está no local correto
2. Reinicie completamente o Bob ou Claude Desktop
3. Verifique os logs de erro do aplicativo

### Erro de permissão

**Solução:** Certifique-se de que o arquivo `dist/index.js` tem permissão de execução:

```bash
chmod +x dist/index.js
```

## 🔄 Atualização

Para atualizar o servidor após mudanças no código:

```bash
cd projeto_final_dio_formacao_bob/dio_explorer/mcp
npm run build
```

Depois reinicie o Bob ou Claude Desktop.

## 📝 Logs e Debug

Para ver logs detalhados, você pode executar o servidor manualmente:

```bash
npm start 2>&1 | tee server.log
```

Isso salvará todos os logs em `server.log` para análise.

## 🆘 Suporte

Se você encontrar problemas:

1. Verifique os logs do servidor
2. Consulte a documentação do MCP: https://modelcontextprotocol.io
3. Abra uma issue no repositório do projeto
4. Entre em contato com a equipe DIO

## 📚 Próximos Passos

Após a instalação bem-sucedida:

1. Leia o [README.md](./README.md) para entender as ferramentas disponíveis
2. Experimente cada ferramenta com diferentes parâmetros
3. Integre o servidor em seus workflows de desenvolvimento
4. Compartilhe feedback e sugestões de melhorias

---

**Desenvolvido com ❤️ pela equipe DIO - Digital Innovation One**