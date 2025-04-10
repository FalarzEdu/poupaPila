# PoupaPila

---



## Tabela de Conteúdos

### 1. [Sobre a aplicação](#Sobre-a-Aplicação)

#### 	1.1 [*Checklist* de Funcionalidades](#Checklist-de-Funcionalidades) 

### 2. [Protótipos de Tela](#Protótipos-de-Tela)

	#### 	2.1 [Link do **Figma**](#Link-do-Figma)

	#### 	2.2 [Imagens dos Protótipos](#Imagens-dos-Protótipos)

### 3. [Modelagem do Banco de Dados](#Modelagem-do-Banco-de-Dados)

### 4. [Planejamento de Sprints](#Planejamento-de-Sprints)



---



## Sobre a Aplicação

**PoupaPila** é uma aplicação baseada em React Native que visa proporcionar uma experiência simples e intuitiva para fins de controle financeiro. Dentre os elementos basilares do seu funcionamento, destacam-se:

- Registro de transações.
- Classificação de transações entre **despesas** e **receitas**.
- Separação de transações por categorias (Ex.: compras, lazer etc).
- Gráfico contendo dados de gastos separados por categoria.

Os pontos acima compõe o núcleo funcional da aplicação. Outras possíveis implementações são:

- Criação de orçamentos.
- Criação de metas.
- Customização de ícones e categorias.
- Rastreador de pagamentos recorrentes (com envio de notificações com aproximação da data de pagamento).
- Dicas e sugestões baseados em compras e hábitos passados (Ex.: notificar sobre aumento de gasto em categoria X, sugerir cortes em áreas com gastos mais elevados que o comum etc).
- "Premiações" (como felicitações ou mensagens motivadoras) quando o usuário ficar dentro do orçamento, atingir uma meta ou terminar um pagamento parcelado.

### *Checklist* de Funcionalidades

#### Primárias

- [ ] Registro de transações.
- [ ] Classificação de transações entre **despesas** e **receitas**.
- [ ] Separação de transações por categorias.
- [ ] Gráfico contendo dados de gastos separados por categoria.

#### Secundárias

- [ ] Criação de orçamentos.
- [ ] Criação de metas.
- [ ] Customização de ícones e categorias.
- [ ] Rastreador de pagamentos recorrentes.
- [ ] Dicas e sugestões baseados em compras e hábitos passados.
- [ ] Notificações "motivadoras".

---



## Protótipos de Tela

### Link do **Figma**

[Prototipação das Telas](https://www.figma.com/design/DMdw32rSur48sGHzmixhok/DPDM-FT---Prototype?node-id=0-1&t=0QLnR9Lr54lwwfJD-1)

### Imagens dos Protótipos

#### Página inicial

<img src="/home/etu/Desktop/UTFPR/5th-semester/DPDM/poupaPila/images/Home - DM.svg" alt="Home - DM" style="zoom:50%;" />

#### Página de despesas

<img src="/home/etu/Desktop/UTFPR/5th-semester/DPDM/poupaPila/images/Expenses - DM.svg" alt="Expenses - DM" style="zoom:50%;" />

#### Página de receitas

<img src="/home/etu/Desktop/UTFPR/5th-semester/DPDM/poupaPila/images/Revenues - DM.svg" alt="Revenues - DM" style="zoom:50%;" />



---



## Modelagem do Banco de Dados

O banco escolhido para a construção da aplicação é o SQLite, um robusto e leve banco de dados SQL baseado em arquivos, portanto a base de dados residirá localmente no dispositivo. A primeira versão do diagrama esquemático foi desenvolvido no site **DBDiagram.io** e pode ser acessado no link abaixo:

[Diagrama Esquemático](https://dbdiagram.io/d/DPDM-Project-67f6eb354f7afba18402e2e7)

Imagens do diagrama esquemático:



![schematic_diagram](/home/etu/Desktop/UTFPR/5th-semester/DPDM/poupaPila/images/schematic_diagram.svg)

---



## Planejamento de Sprints

As *sprints* foram organizadas de forma que as funções nucleares da aplicação sejam construídas em, no máximo, três semanas. A partir disso, outras 2 *sprints* foram elaboradas para implementar funções secundárias (caso haja tempo suficiente).



### ----------------------------------------------------------------------------

### Sprint 01 - 2 a 3 semanas 

### ----------------------------------------------------------------------------

**Objetivo**: Implementar as funcionalidades basilares da aplicação: registro e classificação de transações, organização pro categorias e exposição de despesas divididas em categorias por meio de um gráfico. 

***Story***: Como usuário, quero registrar uma transação contendo seu valor, data e uma breve descrição.

**Tarefas**

- [ ] Criar a UI para formulário de nova transação.
- [ ] Salvar a transação no banco de dados.
- [ ] Exibir lista de transações no app.

***Story***: Como usuário, quero marcar se uma transação é uma receita ou despesa.

- [ ]  Adicionar campo `tipo` à transação (receita/despesa).
- [ ]  Atualizar a UI para permitir escolha entre os dois.

***Story***: Como usuário, quero classificar transações por categorias para entender meus hábitos de gasto.

- [ ]  Criar modelo de categorias.
- [ ]  Associar categoria à transação no formulário.

***Story***: Como usuário, quero possui uma tela central (estilo dashboard) contendo dados gerais sobre minha situação financeira

**Tarefas**

- [ ] Construção da UI da página central
- [ ] Visualização de dados gerais, como saldo atual, saldo no início do mês e projeção de saldo ao final do mês.
- [ ] Resumo do valor total das receitas e despesas.
- [ ] Gráfico para separação das despesas em função das categorias

### ----------------------------------------------------------------------------

### Sprint 02 - 1 semana 

### ----------------------------------------------------------------------------

**Objetivo**: Desenvolver funcionalidades secundárias para uma melhor organização financeira, como criação de orçamentos.

***Story***: Como usuário, gostaria de poder criar orçamentos para que eu possa ter um controle mais granular e visual (na tela principal) sobre o quanto gasto (em valores absolutos e percentuais em relação a um total estipulado por mim) em uma determinada categoria.

**Tarefas**

- [ ] Atualizar diagrama do banco de dados para comportar nova funcionalidade.
- [ ] Adicionar UI para criação de orçamento.
- [ ] Implementação da barra de controle do orçamento na tela inicial.

***Story***: Como usuário, é útil possuir uma seção onde posso estipular metas básicas, como guardar um valor X e poder visualizar (na página inicial) quanto ainda falta para atingir a meta em questão.

- [ ] Atualizar diagrama do banco de dados para comportar nova funcionalidade.

- [ ] Adicionar UI para criação de meta.

- [ ] Implementação da barra de controle de meta na tela inicial.

  

### ----------------------------------------------------------------------------

### Sprint 03 - 1 a 2 semanas 

### ----------------------------------------------------------------------------

**Objetivo**: Implementar funcionalidades com o intuito de tornar o controle financeiro mais dinâmico e "motivacional", como pequenas frases ao completar metas, manter-se no orçamento ou terminar o pagamento de uma compra parcelada. Além disso, visa a construção de um pequeno sistema de recomendações, indicando categorias que aumentaram muito em comparação com a média dos meses anteriores ou sugestões para corte em determinadas categorias.

***Story***: Como usuário, me sentiria mais motivado a seguir cumprindo com minhas metas e mantendo-me dentro dos orçamentos caso recebesse algumas "premiações" ao fazê-lo.

**Tarefas**

- [ ] Implementar notificação parabenizando o usuário ao cumprir uma meta.
- [ ] Implementar notificação premiando o usuário por manter-se dentro de um ou mais orçamentos.
- [ ] Implementar notificação incentivadora caso o usuário termine um pagamento parcelado com várias parcelas.

***Story***: Como usuário, quero receber dicas sobre possíveis cortes em categorias que possuem gastos muitos mais elevados que outras, além de ser notificado sobre aumentos de gastos em relação a meses anteriores.

**Tarefas**

- [ ] Implementar notificação caso o gasto com uma categoria (exceto as categorias "contas fixas" e "saúde") esteja muito maior em comparação a outras (caso a categoria assuma sozinha mais de 1/3 do total).
- [ ] Implementar notificação caso uma categoria exceda a média dos últimos 3 meses em mais de 25%.

