# Instruções para Fazer Push no GitHub

## 📋 Pré-requisitos

- Git instalado no seu computador
- Conta GitHub ativa
- Repositório já criado em: https://github.com/PauloEmanuell/petshop-mais

## 🚀 Passos para Fazer o Push

### 1. Abra o Terminal/Prompt de Comando

```bash
# No Windows, use o Git Bash ou PowerShell
# No Mac/Linux, use o Terminal
```

### 2. Navegue até a Pasta do Projeto

```bash
cd caminho/para/petshop-php
```

### 3. Inicialize o Git (se ainda não tiver feito)

```bash
git init
git config user.email "paulo.emanuell.lima2@gmail.com"
git config user.name "PauloEmanuell"
```

### 4. Adicione Todos os Arquivos

```bash
git add .
```

### 5. Faça o Primeiro Commit

```bash
git commit -m "Projeto Petshop Online - Versão 1.0 com HTML, CSS, JavaScript e PHP"
```

### 6. Adicione o Repositório Remoto

```bash
git remote add origin https://github.com/PauloEmanuell/petshop-mais.git
```

### 7. Renomeie a Branch para 'main' (se necessário)

```bash
git branch -M main
```

### 8. Faça o Push para o GitHub

```bash
git push -u origin main
```
 
---

**Desenvolvido por:** Paulo Emanuell Lima  
**Data:** 2026
