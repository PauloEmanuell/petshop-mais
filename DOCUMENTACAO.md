# Petshop Online - Documentação Completa

## 📋 Informações do Projeto

**Projeto:** Plataforma Online para Petshop  
---

## 🔗 Links Importantes

### Repositório GitHub
**URL:** https://github.com/PauloEmanuell/petshop-mais

### Site Publicado (GitHub Pages)
**URL:** https://pauloemanuell.github.io/petshop-mais/

### Página de Ajuda
**URL:** https://pauloemanuell.github.io/petshop-mais/help.html

---

## 📌 Objetivo e Metas

### Objetivo Geral
Desenvolver uma plataforma web completa para um petshop online que permita aos usuários visualizar produtos, agendar serviços e entrar em contato com a empresa.

### Metas Específicas

#### Fase 1 - Fundamentação
- Criar estrutura HTML sem customizações CSS/Bootstrap
- Implementar header com navegação
- Desenvolver páginas de produtos e serviços
- Criar footer com informações legais
- Publicar no GitHub
- Configurar GitHub Pages

#### Fase 2 - Implementação Completa
- Aplicar CSS/Bootstrap responsivo
- Implementar JavaScript para interatividade
- Criar carrossel de produtos
- Desenvolver formulário de cadastro
- Implementar agendamento com calendário
- Adicionar funcionalidade de tele-busca
- Garantir acessibilidade
- Implementar comentários de clientes
- Criar página de ajuda

---

## 🏗️ Estrutura do Projeto

```
petshop-php/
├── index.html                      # Página inicial
├── produtos.html                   # Catálogo de produtos
├── servicos.html                   # Serviços e agendamento
├── contato.html                    # Formulário de contato
├── help.html                       # Página de ajuda
├── css/
│   └── style.css                   # Estilos CSS responsivos
├── js/
│   └── script.js                   # Scripts JavaScript
├── php/
│   ├── processar_agendamento.php   # Processamento de agendamentos
│   └── processar_contato.php       # Processamento de contatos
├── images/                         # Diretório para imagens
├── dados/                          # Armazenamento de dados JSON
├── README.md                       # Documentação do projeto
├── DOCUMENTACAO.md                 # Este arquivo
└── .gitignore                      # Configuração do Git
```

---

## 📄 Descrição das Páginas

### 1. Home (index.html)
**Funcionalidade:** Página inicial com apresentação do petshop

**Seções:**
- Hero section com chamada para ação
- Grid de categorias de produtos
- Serviços destacados
- Comentários de clientes
- Footer com informações

**Elementos:**
- Navegação fixa no header
- Links para todas as páginas
- Botões de chamada para ação

### 2. Produtos (produtos.html)
**Funcionalidade:** Catálogo completo de produtos

**Categorias:**
1. **Acessórios** (Coleira Ajustável, Brinquedo Mordedor)
2. **Rações** (Ração Premium Cães, Ração para Gatos Filhotes)
3. **Higiene/Limpeza** (Shampoo Hipoalergênico, Escova para Pelos Longos)

**Recursos:**
- Exibição de 2 produtos por categoria
- Imagem, descrição e preço de cada produto
- Botão "Adicionar ao Carrinho"
- Carrinho salvo em localStorage

### 3. Serviços (servicos.html)
**Funcionalidade:** Informações de serviços e agendamento

**Serviços Oferecidos:**
1. **Banho e Tosa Completo** - R$ 80,00
2. **Banho e Tosa com Tele-busca** - R$ 100,00
3. **Consulta Veterinária** - R$ 150,00
4. **Adestramento Básico** - R$ 200,00

**Formulário de Agendamento:**
- Seleção de serviço
- Dados do pet (nome, tipo)
- Data e hora desejadas
- Dados do cliente (nome, telefone)
- Validação de formulário
- Envio via AJAX para PHP

### 4. Contato (contato.html)
**Funcionalidade:** Formulário de contato e informações

**Elementos:**
- Formulário de contato com validação
- Informações de contato (email, telefone, endereço)
- Horário de funcionamento
- Mapa de localização
- Redes sociais

### 5. Ajuda (help.html)
**Funcionalidade:** Central de ajuda e documentação

**Seções:**
- Sobre o projeto
- Como navegar
- Funcionalidades
- Tecnologias utilizadas
- Perguntas frequentes
- Informações do projeto
- Suporte

---

## 🎨 Design e Responsividade

### Paleta de Cores
- **Primária:** Verde Menta (#10B981)
- **Secundária:** Coral (#FB7185)
- **Acentuada:** Azul Céu (#0EA5E9)
- **Fundo:** Roxo Claro (#F5F3FF)
- **Texto:** Cinza Escuro (#1F2937)

### Tipografia
- **Títulos:** Poppins (700 - Bold)
- **Corpo:** Inter (400 - Regular, 500 - Medium, 600 - Semibold)

### Breakpoints Responsivos
- **Mobile:** até 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px+

### Componentes Responsivos
- Grid CSS com auto-fit
- Flexbox para layouts
- Media queries para adaptação
- Imagens responsivas
- Formulários adaptáveis

---

## 💻 Tecnologias Utilizadas

### Frontend
- **HTML5:** Estrutura semântica
- **CSS3:** Estilos modernos e responsivos
- **JavaScript ES6+:** Interatividade e validação

### Backend
- **PHP 7.4+:** Processamento de formulários
- **JSON:** Armazenamento de dados

### Ferramentas
- **Git:** Controle de versão
- **GitHub:** Repositório remoto
- **GitHub Pages:** Hospedagem

---

## 🔧 Funcionalidades Implementadas

### JavaScript
1. **Validação de Formulários**
   - Email válido
   - Telefone válido
   - Campos obrigatórios

2. **Carrinho de Compras**
   - Adicionar produtos
   - Remover produtos
   - Calcular total
   - Persistência em localStorage

3. **Agendamento**
   - Seleção de serviço
   - Calendário de data
   - Validação de data futura
   - Envio via AJAX

4. **Contato**
   - Envio de mensagens
   - Validação de dados
   - Resposta do servidor

### PHP
1. **Processamento de Agendamentos**
   - Validação de dados
   - Sanitização de entrada
   - Salvamento em JSON
   - Email de confirmação (opcional)

2. **Processamento de Contatos**
   - Validação de dados
   - Sanitização de entrada
   - Salvamento em JSON
   - Email para admin e cliente

---

## ♿ Acessibilidade

### Implementações
- Labels associados aos inputs
- Atributos alt em imagens
- Semântica HTML correta
- Contraste de cores adequado
- Navegação por teclado
- ARIA labels onde necessário

### Compatibilidade
- Leitores de tela
- Navegadores modernos
- Dispositivos móveis
- Zoom de página

---

## 📊 Requisitos Atendidos

### Fase 1
- Páginas HTML sem CSS/Bootstrap
- Header com navegação
- 2 produtos de cada 3 categorias
- Serviços com descrição e valor
- Footer com informações
- Repositório GitHub
- GitHub Pages ativo

### Fase 2
- CSS/Bootstrap responsivo
- JavaScript funcional
- Carrossel de produtos
- Formulário de cadastro
- Agendamento com calendário
- Tele-busca e entrega
- Acessibilidade
- Comentários de clientes
- Código comentado
- Página de ajuda

---

## 🚀 Como Executar

### Requisitos
- PHP 7.4+ instalado
- Navegador web moderno
- Conexão com internet (opcional)

### Instalação Local

1. **Clone o repositório:**
```bash
git clone https://github.com/PauloEmanuell/petshop-mais.git
cd petshop-mais
```

2. **Inicie um servidor PHP:**
```bash
php -S localhost:8000
```

3. **Acesse no navegador:**
```
http://localhost:8000
```

### Acesso Online
Acesse diretamente: https://pauloemanuell.github.io/petshop-mais/

---

## 📝 Instruções de Uso

### Navegação
1. Use o menu no header para navegar entre as páginas
2. Clique nos botões de ação para interagir com o site

### Compra de Produtos
1. Acesse "Produtos"
2. Escolha o produto desejado
3. Clique em "Adicionar ao Carrinho"
4. Os itens são salvos no seu navegador

### Agendamento de Serviços
1. Acesse "Serviços"
2. Escolha o serviço desejado
3. Preencha o formulário com dados do pet
4. Selecione data e hora
5. Clique em "Agendar"

### Contato
1. Acesse "Contato"
2. Preencha o formulário
3. Clique em "Enviar Mensagem"

---

## 🔐 Segurança

### Medidas Implementadas
- Sanitização de entrada (htmlspecialchars, strip_tags)
- Validação de dados no frontend e backend
- Proteção contra XSS
- Proteção contra SQL Injection (uso de JSON)
- Validação de email e telefone

---

## 📞 Suporte e Contato

**Email:** contato@petshoponline.com  
**Telefone:** (11) 98765-4321  
**Endereço:** Rua dos Animais, 123 - Cidade dos Pets, SP

**Horário de Funcionamento:**
- Segunda a Sexta: 09:00 - 18:00
- Sábado: 09:00 - 13:00
- Domingo: Fechado

---

## 📄 Licença

Este projeto é fornecido como material educacional.

---

## 👨‍💻 Desenvolvedor

**Paulo Emanuell Lima**  
GitHub: https://github.com/PauloEmanuell  
Email: paulo.emanuell.lima2@gmail.com

---

**Versão:** 1.0  
**Data:** 2026
**Status:** Completo
