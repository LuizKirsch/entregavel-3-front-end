# 📋 Kanbanzin dos Guris

> Sistema de gerenciamento de tarefas estilo Kanban desenvolvido com React + TypeScript + Vite

## 🎯 Sobre o Projeto

Este é um projeto acadêmico que implementa um sistema Kanban completo para gerenciamento de tarefas, com interface moderna e responsiva.

## ✅ Requisitos Implementados

### Funcionalidades Principais
- ✅ **Criar tarefa** - Adicione novas tarefas através do botão flutuante
- ✅ **Editar tarefa** - Clique no ícone de edição para modificar tarefas existentes
- ✅ **Deletar tarefa** - Remova tarefas através do ícone de lixeira
- ✅ **Listar tarefa** - Visualize tarefas organizadas por categoria (A Fazer, Em Andamento, Concluído)
- ✅ **Mover tarefa entre categorias** - Arraste e solte tarefas entre as colunas
- ✅ **Implementar validação** - Tarefas concluídas não podem ter seu status alterado
- ✅ **Responsividade** - Interface adaptável para diferentes tamanhos de tela

### Regras de Negócio

#### 🔒 Validação de Tarefas Concluídas
- Tarefas marcadas como "Concluído" **não podem** ser movidas para outras colunas
- Tarefas concluídas **não podem** ter seu status alterado no modal de edição
- Tentativas de alteração exibem mensagem de erro: *"Após finalizada não pode ser alterada o status"*

#### 📱 Interface
- Design responsivo que funciona em desktop, tablet e mobile
- Feedback visual através de toasts para todas as ações
- Drag & drop intuitivo entre colunas
- Modal centralizado para criação/edição de tarefas

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd entregavel-3-front-end
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente** (opcional)
   ```bash
   # Crie um arquivo .env na raiz do projeto
   VITE_API_BASE=https://pacaro-tarefas.netlify.app/api/kirsch
   ```

4. **Execute o projeto**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse no navegador**
   ```
   http://localhost:5173
   ```

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Biblioteca de ícones
- **React Router** - Roteamento para React

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Column.tsx      # Coluna do Kanban
│   ├── TaskCard.tsx    # Card individual da tarefa
│   ├── TaskModal.tsx   # Modal de criação/edição
│   ├── Toast.tsx       # Notificações
│   ├── Header.tsx      # Cabeçalho
│   └── Footer.tsx      # Rodapé
├── layouts/            # Layouts da aplicação
├── api.ts             # Funções de API
├── App.tsx            # Componente principal
└── main.tsx           # Ponto de entrada
```

## 🎨 Features da Interface

- **Drag & Drop** - Mova tarefas entre colunas arrastando
- **Toasts** - Feedback visual para todas as ações
- **Modal Responsivo** - Criação e edição de tarefas
- **Botão Flutuante** - Acesso rápido para criar tarefas
- **Validação Visual** - Campos desabilitados para tarefas concluídas

---

**Desenvolvido para projeto acadêmico** 🎓
