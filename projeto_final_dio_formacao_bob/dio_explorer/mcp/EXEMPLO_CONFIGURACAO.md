# 🔧 Exemplos de Configuração - DIO Explorer MCP Server

## 📋 Configuração para Bob (Roo-Cline)

### Localização do arquivo de configuração

O arquivo de configuração do Bob geralmente está em:
- `~/.bob/mcp-settings.json`
- Ou no diretório de configuração do VS Code

### Exemplo de configuração completa

```json
{
  "mcpServers": {
    "dio-explorer": {
      "command": "node",
      "args": [
        "/Users/seu-usuario/Documents/bob/[2026][DIO]formacao_ibm_bob/projeto_final/projeto/projeto_final_dio_formacao_bob/projeto_final_dio_formacao_bob/dio_explorer/mcp/dist/index.js"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### Como obter o caminho correto

Execute no terminal:

```bash
cd projeto_final_dio_formacao_bob/dio_explorer/mcp
pwd
```

O resultado será algo como:
```
/Users/seu-usuario/Documents/bob/.../projeto_final_dio_formacao_bob/dio_explorer/mcp
```

Adicione `/dist/index.js` ao final deste caminho.

## 📋 Configuração para Claude Desktop

### Localização do arquivo de configuração

**macOS:**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

**Linux:**
```
~/.config/Claude/claude_desktop_config.json
```

### Exemplo de configuração

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

### Configuração com múltiplos servidores MCP

```json
{
  "mcpServers": {
    "dio-explorer": {
      "command": "node",
      "args": [
        "/caminho/para/dio_explorer/mcp/dist/index.js"
      ]
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/seu-usuario/Documents"
      ]
    },
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "seu_token_aqui"
      }
    }
  }
}
```

## 🧪 Testando a Configuração

### 1. Verificar se o servidor inicia

```bash
cd projeto_final_dio_formacao_bob/dio_explorer/mcp
npm start
```

Você deve ver:
```
DIO Explorer MCP Server iniciado com sucesso!
Ferramentas disponíveis:
  - buscar_trilha: ...
  - gerar_desafio: ...
  - gerar_certificado: ...
  - listar_tecnologias: ...
```

### 2. Testar com Bob/Claude

Após configurar e reiniciar o Bob ou Claude Desktop, tente:

**Exemplo 1: Listar tecnologias**
```
Usuário: "Liste todas as tecnologias disponíveis na DIO"
```

**Exemplo 2: Buscar trilha**
```
Usuário: "Busque informações sobre a trilha de Python"
```

**Exemplo 3: Gerar desafio**
```
Usuário: "Gere um desafio de JavaScript nível intermediário"
```

**Exemplo 4: Gerar certificado**
```
Usuário: "Gere um certificado para João Silva na trilha de Java"
```

## 🔍 Verificando se o servidor está ativo

### No Bob

1. Abra o Bob
2. Digite: "Quais ferramentas MCP estão disponíveis?"
3. Você deve ver `dio-explorer` listado com suas 4 ferramentas

### No Claude Desktop

1. Abra o Claude Desktop
2. Procure por um ícone de ferramentas ou configurações
3. Verifique se `dio-explorer` aparece na lista de servidores MCP

## 🐛 Problemas Comuns

### Servidor não aparece

**Solução:**
1. Verifique se o caminho no arquivo de configuração está correto
2. Certifique-se de usar o caminho ABSOLUTO (não relativo)
3. Reinicie completamente o Bob ou Claude Desktop
4. Verifique se o arquivo `dist/index.js` existe

### Erro "Cannot find module"

**Solução:**
```bash
cd projeto_final_dio_formacao_bob/dio_explorer/mcp
npm install
npm run build
```

### Erro de permissão

**Solução (macOS/Linux):**
```bash
chmod +x dist/index.js
```

## 📝 Exemplo de Uso Completo

### Cenário: Aprender Python

```
Usuário: "Quero aprender Python, me ajude a começar"

Bob/Claude: [usa buscar_trilha com tecnologia="Python"]
Retorna: Plano de estudos completo da trilha Python

Usuário: "Agora me dê um desafio básico de Python"

Bob/Claude: [usa gerar_desafio com tecnologia="Python", nivel="Básico"]
Retorna: Desafio de código com requisitos e dicas

Usuário: "Completei! Gere meu certificado. Meu nome é Maria Silva"

Bob/Claude: [usa gerar_certificado com nome="Maria Silva", tecnologia="Python"]
Retorna: Certificado gerado e salvo
```

## 🎯 Dicas de Uso

1. **Seja específico:** "Busque a trilha de React" é melhor que "Me fale sobre React"
2. **Use nomes completos:** Para certificados, use nome completo entre aspas
3. **Especifique o nível:** Para desafios, mencione o nível desejado
4. **Explore todas as ferramentas:** Teste cada uma para entender suas capacidades

## 🔄 Atualizando o Servidor

Após fazer mudanças no código:

```bash
cd projeto_final_dio_formacao_bob/dio_explorer/mcp
npm run build
```

Depois reinicie o Bob ou Claude Desktop.

## 📚 Recursos Adicionais

- [Documentação MCP](https://modelcontextprotocol.io)
- [README do projeto](./README.md)
- [Guia de Instalação](./GUIA_INSTALACAO.md)

---

**Desenvolvido com ❤️ pela equipe DIO - Digital Innovation One**