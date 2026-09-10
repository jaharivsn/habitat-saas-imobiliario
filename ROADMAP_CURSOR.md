# ROADMAP MODULAR DE DESENVOLVIMENTO & GUIA CURSOR
## Habitat — Ecossistema Imobiliário & Boutique SaaS (Next.js 16)

Este documento divide o desenvolvimento do ecossistema em três etapas lógicas e modulares, permitindo iterar, aprovar com o cliente e avançar sem sobrecarregar o contexto de desenvolvimento no Cursor.

---

## 🗺️ Visão Geral do Roadmap

| Fase | Nome | Objetivo Principal | Status |
| :--- | :--- | :--- | :--- |
| **Fase 1** | **MVP de Aprovação** | Casca do portal, busca, ficha técnica, dashboard básico, CRM simples, cadastro de imóvel em 10 etapas e admin de moderação. | ✅ **Concluído & Compilado (52 rotas)** |
| **Fase 2** | **SaaS Operacional & Conversão** | Agenda/calendário, mensagens, clientes, comparador, favoritos, vitrine customizável e planos SaaS. | 🚀 **Próxima Etapa no Cursor** |
| **Fase 3** | **Multi-equipe, BI & Governança** | Hierarquia de equipes imobiliárias, analytics de conversão, moderação avançada e relatórios exportáveis. | 🎯 **Fase de Escala** |

---

## 📌 FASE 1: MVP de Aprovação (Estado Atual)

### O que já está implementado e validável:
1. **Portal Público:**
   - **Homepage:** Hero com headline canônica *"Encontre seu próximo imóvel"*, barra de busca multi-critério (Cidade, Bairro, Condomínio, Endereço, Código) com abas (Comprar, Alugar, Lançamentos, Investir), Curadoria Seleta, Estilos de Vida, Destaque Condomínio e Manifesto.
   - **Catálogo & Busca (`/imoveis`):** Lista filtrável por tipo, operação, preço, quartos, suítes, vagas, comodidades, com ordenação e alternância de visualização.
   - **Ficha do Imóvel (`/imovel/[slug]`):** Galeria visual, especificações técnicas tabulares, descrição, diferenciais, comodidades e card fixo com WhatsApp direto e formulário de agendamento de visita.
   - **Vitrines Públicas:** Páginas públicas dedicadas para Corretores (`/corretor/[slug]`), Imobiliárias (`/imobiliaria/[slug]`) e Condomínios (`/condominio/[slug]`).
2. **Painel SaaS do Corretor (`/dashboard`):**
   - **Visão Geral:** KPIs de imóveis ativos, leads novos, visitas agendadas, alcance e atividades recentes.
   - **Gestão de Imóveis (`/dashboard/imoveis`):** Listagem por status (rascunho, publicado, vendido, alugado) com ações rápidas.
   - **Cadastro em 10 Etapas (`/dashboard/imoveis/novo`):** Wizard sequencial para publicação de novas propriedades.
   - **CRM de Leads (`/dashboard/leads`):** Visualização em lista e Kanban por estágios de qualificação (Novo, Contatado, Visita Agendada, etc.).
3. **Admin da Plataforma (`/admin`):**
   - **Visão Macro:** Métricas globais de GMV sob gestão, MRR estimado e fila de moderação de anúncios pendentes (`/admin/moderacao`).
4. **Infraestrutura Mock:**
   - Alternador de perfis (`RoleSwitcherBar`) permitindo testar a experiência como comprador público, corretor, imobiliária e admin com 1 clique, sem dependência de banco de dados externo.

---

## 🚀 FASE 2: SaaS Operacional & Engajamento do Comprador

### Módulos a Desenvolver / Refinar:
1. **Agenda e Calendário Operacional (`/dashboard/agenda`):**
   - Calendário visual interativo com visualização mensal e semanal.
   - Agendamento de visitas com confirmação e status (Confirmada, Pendente, Realizada, Cancelada).
   - Integração de lembretes rápidos e atalhos para WhatsApp do lead.
2. **Central de Mensagens Unificada (`/dashboard/mensagens`):**
   - Interface no padrão chat split-pane (conversas na esquerda, thread ativa na direita).
   - Filtros por lead, cliente e imóvel vinculado.
   - Modelos prontos de resposta rápida (ex: envio de ficha técnica, confirmação de horário de visita).
3. **Gestão e Carteira de Clientes (`/dashboard/clientes` e `/dashboard/clientes/[id]`):**
   - Perfil detalhado do cliente com histórico de visitas, imóveis favoritos, orçamento máximo e regiões de preferência.
4. **Experiência do Comprador:**
   - **Comparador de Imóveis (`/comparar`):** Tabela comparativa lado a lado com especificações, valores de condomínio/IPTU e diferenciais.
   - **Área de Favoritos & Buscas Salvas (`/favoritos` e `/conta`):** Gerenciamento de imóveis curtidos e alertas de novos anúncios.
5. **Vitrine Personalizável do Corretor (`/dashboard/pagina-publica`):**
   - Editor visual simples para o corretor definir foto/logo, biografia, banner de destaque, redes sociais e imóveis em evidência.
6. **Planos SaaS & Assinaturas (`/anunciar` e `/dashboard/assinatura`):**
   - Tabela comparativa com os 4 planos (Individual, Pro, Imobiliária e Enterprise) destacando limites de imóveis e features.

---

## 🎯 FASE 3: Multi-equipe Corporativa, Analytics & Governança

### Módulos a Desenvolver:
1. **Gestão de Equipes para Imobiliárias (`/dashboard/equipe`):**
   - Matriz de cargos: Proprietário, Administrador, Gerente, Corretor, Assistente.
   - Sistema de transferência e redistribuição de leads entre corretores.
   - Painel de produtividade individual por corretor.
2. **Analytics Avançado & BI (`/dashboard/performance`):**
   - Funil de conversão (Visualizações ➔ Contatos WhatsApp ➔ Visitas Agendadas ➔ Propostas ➔ Vendas).
   - Relatórios de performance por bairro e tipologia de imóvel.
   - Exportação de relatórios em PDF / CSV.
3. **Governança Master da Plataforma (`/admin/*`):**
   - Moderação avançada com auditoria de qualidade de fotos e precificação.
   - Gestão de denúncias, suspensão de contas e controle de destaques patrocinados na home.

---

# 📋 PROMPTS PRONTOS PARA O CURSOR

Copie e cole os blocos abaixo diretamente no **Composer do Cursor (`Ctrl+I`)** conforme você avançar em cada fase.

---

### PROMPT PARA EXECUTAR A FASE 2 NO CURSOR

```markdown
Você é um Engenheiro Frontend Sênior especializado em Next.js 16 (App Router), Tailwind CSS e TypeScript.
Estamos desenvolvendo o ecossistema imobiliário "Habitat" em um repositório já existente.

OBJETIVO DA FASE 2:
Implementar os módulos operacionais de produtividade do corretor e engajamento do comprador, mantendo a estética ultra-clean, vanilla (fonte Inter), sem banco de dados externo e utilizando os mocks locais em `src/data/mockData.ts`.

REGRAS:
- Utilize apenas TypeScript estrito e Tailwind CSS nativo.
- Sem bibliotecas externas pesadas de UI (utilize Lucide React já instalado).
- Mantenha a compilação com zero erros em `npx tsc --noEmit`.

TAREFAS:
1. Refinar `/dashboard/agenda`:
   - Implementar calendário semanal/mensal funcional com cards de visitas marcadas.
   - Permitir trocar data, filtrar por tipo (visita presencial, tour virtual, reunião) e botão rápido para abrir o WhatsApp do lead.

2. Refinar `/dashboard/mensagens`:
   - Criar interface split-pane moderna (lista de conversas à esquerda, thread de chat à direita).
   - Exibir histórico de mensagens mock, campo de envio de mensagem rápida e dados do imóvel em negociação no topo.

3. Refinar `/dashboard/clientes` e `/dashboard/clientes/[id]`:
   - Criar listagem e ficha detalhada de cada cliente, exibindo faixa de preço desejada, bairros de interesse, imóveis favoritados e histórico de interações.

4. Refinar `/comparar`:
   - Permitir selecionar até 3 imóveis para comparação direta em tabela de especificações (preço, m², quartos, suítes, vagas, condomínio, IPTU e comodidades).

5. Refinar `/dashboard/pagina-publica`:
   - Criar formulário de personalização onde o corretor pode alterar seu nome de exibição, bio, links sociais e pré-visualizar sua vitrine pública em tempo real.

Execute as modificações, assegure que os imports estejam corretos e valide a integridade do código.
```

---

### PROMPT PARA EXECUTAR A FASE 3 NO CURSOR

```markdown
Você é um Engenheiro Frontend Sênior especializado em Next.js 16 (App Router), Tailwind CSS e TypeScript.
Estamos desenvolvendo o ecossistema imobiliário "Habitat" em um repositório já existente.

OBJETIVO DA FASE 3:
Construir os módulos corporativos de gestão de equipe multi-nível, analytics avançado de negócio e a governança administrativa completa da plataforma.

REGRAS:
- Seguir o design system clean, vanilla Inter, institucional e corporativo.
- Integrar com o estado de autenticação mock (`useAuth`) para respeitar os papéis `agency_owner` e `platform_admin`.
- Zero erros de TypeScript (`npx tsc --noEmit`).

TAREFAS:
1. Implementar `/dashboard/equipe`:
   - Listagem dos membros da equipe com avatares, cargos (Proprietário, Gerente, Corretor), CRECI, imóveis sob gestão e volume de vendas.
   - Modal funcional para convidar novo corretor com definição de permissões.
   - Ação para reatribuir leads entre corretores.

2. Implementar `/dashboard/performance`:
   - Métricas avançadas de funil: taxa de conversão de cliques para WhatsApp, tempo médio entre primeiro contato e visita, ticket médio transacionado.
   - Gráficos de barra/linha limpos em CSS/SVG nativo para visualizações semanais por canal de aquisição.

3. Refinar `/admin/moderacao`:
   - Fila de anúncios submetidos com checklist de qualidade (fotos em alta resolução, preço condizente com a região, documentação básica).
   - Ações de 1-clique para Aprovar, Solicitar Ajuste ou Rejeitar com envio de justificativa mock.

4. Refinar `/admin/planos` e `/admin/assinaturas`:
   - Painel de controle das assinaturas ativas de corretores e imobiliárias, com status de adimplência e histórico de renovações.

Execute as modificações e garanta a integridade visual e funcional de todo o fluxo.
```
