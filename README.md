# TSK — Tudo Sobre Kpop

## 📌 Introdução
Aplicativo e site para fãs de K-pop acompanharem seus artistas favoritos, lançamentos, eventos e novidades em um só lugar.

## 📝 Descrição do Problema Real
O crescimento exponencial da popularidade do K-pop no Brasil e no mundo gerou uma demanda por plataformas que centralizem informações sobre artistas, grupos, lançamentos, eventos e votações. Atualmente, os fãs precisam acessar diversas redes sociais, sites e aplicativos para se manterem atualizados, o que torna a experiência fragmentada, confusa e pouco eficiente. Além disso, a ausência de personalização e de recursos de acessibilidade limita o acesso de muitos usuários a essas informações. 
Os resultados da pesquisa de campo evidenciam os pontos negativos relatados pelos usuários, os quais reforçam a necessidade de uma solução como o TSK, que se propõe a centralizar e simplificar o acesso às informações do universo K-pop.

Dados da Pesquisa de campo 
[📄 Pesquisa de Campo (PDF)](Documentos/Pesquisa%20de%20campo.pdf)

## 💡 Proposta da Solução
O projeto **TSK (Tudo Sobre Kpop)** propõe o desenvolvimento de um site e futuro aplicativo que centralize todas as informações relevantes do universo K-pop em um único ambiente digital. A plataforma permitirá que os usuários acompanhem seus artistas favoritos, recebam notificações personalizadas sobre lançamentos, eventos e votações, e tenham acesso a conteúdos atualizados de forma prática e intuitiva. O sistema também contará com recursos de acessibilidade e personalização, promovendo uma experiência inclusiva e adaptada ao perfil de cada fã.

## 🎯 Público-Alvo
- Fãs de K-pop de todas as idades, com foco principal em adolescentes e jovens adultos.  
- Usuários que desejam acompanhar lançamentos, eventos e notícias de seus grupos/artistas favoritos.  
- Pessoas com deficiência visual ou auditiva que buscam uma plataforma acessível e inclusiva.  
- Usuários que preferem uma experiência personalizada e centralizada em vez de depender de múltiplas redes sociais.  

## ⚙️ Funcionalidades Principais
1. Login e cadastro de usuários  
2. Tela inicial personalizada com artistas seguidos, atualizações e recomendações  
3. Página individual de cada artista/grupo com eventos, álbuns, votações e notificações  
4. Página do usuário com edição de perfil, configurações e lista de artistas acompanhados  
5. Tela de notificações com alertas sobre lançamentos, eventos e votações  
6. Campo de pesquisa para encontrar artistas, grupos, álbuns e músicas  
7. Página de acessibilidade com modo claro/escuro e recursos para pessoas com deficiência visual e auditiva  

## 🚀 Etapa Intermediária — Evolução do Projeto
Na entrega intermediária, o foco foi evoluir a aplicação de forma profissional e rastreável, seguindo práticas de mercado:

- Gestão de demandas com GitHub Issues: cada nova funcionalidade foi documentada em uma Issue.

- Branching no Git: o desenvolvimento ocorreu em uma branch dedicada chamada entrega-intermediaria.

- Integração com API pública: o sistema passou a consumir dados externos (ex.: artistas via MusicBrainz API), enriquecendo a experiência dos usuários.

- Teste de Integração: foram criados testes automatizados para validar a comunicação com a API e garantir que o fluxo de dados não quebre a aplicação.

- Deploy: a aplicação foi publicada na nuvem, ficando acessível através de um link público.

## ⚙️ Funcionalidades Implementadas nesta Etapa
Consumo de API pública para buscar informações de artistas.

Testes de integração garantindo que a API responde corretamente.

Pipeline de CI/CD no GitHub Actions validando lint e testes.

Deploy da aplicação em ambiente online.

## 🛠️ Tecnologias Utilizadas
- Frontend: HTML5, CSS3, JavaScript (React)  
- Backend: Node.js com Express  
- Banco de Dados: Firebase (protótipo)
- Testes: Jest + Supertest
- CI/CD: GitHub Actions
- Deploy: Github Pages

🚀 Deploy
Acesse a aplicação publicada: https://ana-juliaps.github.io/TSK/

## 🚀 Instalação
Clone o repositório e instale as dependências:
```
bash
git clone https://github.com/Ana-Juliaps/TSK.git
cd tsk
npm install
```

## ▶️ Execução
Rodar o servidor local:
```
node src/server.js
```
Acesse no navegador:
```
http://localhost:3000
```

## 🚀 Deploy
Acesse a aplicação publicada: [https://tks.vercel.app](https://tsk-pied.vercel.app/)

## 🧪 Testes
- Testes unitários e de integração implementados com **Jest** e **Nock**.
- Para rodar localmente:
  ```bash
  npm ci
  npm test
  ```

🔍 Lint
Verificar qualidade do código
```
npm run lint
```
## ![CI](https://github.com/Ana-Juliaps/TSK/actions/workflows/ci.yml/badge.svg)

# 👩‍💻 Autor
Ana Júlia — Bootcamp TSK

🔗 Repositório
[Link para o GitHub](https://github.com/Ana-Juliaps/TSK.git)
