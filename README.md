<div align="center">

[![Stars](https://img.shields.io/github/stars/Wagner-Schemmer/monitoramento-animal-site?style=social)](https://github.com/Wagner-Schemmer/monitoramento-animal-site/stargazers)
[![Live](https://img.shields.io/badge/demo-ao_vivo-22c55e?style=for-the-badge&logo=vercel&logoColor=white)](https://databov.vercel.app)
[![Sucessor](https://img.shields.io/badge/sucessor-DataBov_v2-4ade80?style=flat-square&logo=vercel&logoColor=white)](https://databov-v2.vercel.app)
![HTML](https://img.shields.io/badge/HTML-5-E34F26?style=flat-square&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

  <a href="https://databov.vercel.app"><img alt="DataBov v1 — a versão original" src="docs/banner.svg" /></a>

  <h1>DataBov · v1</h1>

  <p>
    <b>A versão original: landing + dashboard + backend IoT.</b>
    <br />
    Coleira inteligente com IA para Compost Barn e Freestall, índice de bem-estar de 1 a 5.
  </p>

  <p>
    <a href="https://databov.vercel.app"><b>Demo</b></a> ·
    <a href="https://databov-v2.vercel.app">Sucessor (v2)</a> ·
    <a href="#o-que-cada-pagina-faz">Páginas</a> ·
    <a href="#como-rodar">Como rodar</a> ·
    <a href="#stack">Stack</a>
  </p>
</div>

<a href="https://databov.vercel.app"><img src="docs/preview.png" alt="DataBov v1 ao vivo" /></a>

> [!NOTE]
> Este é o site original do projeto. A versão atualizada mora em [**databov-v2**](https://github.com/Wagner-Schemmer/databov-v2) ([databov-v2.vercel.app](https://databov-v2.vercel.app)).

## O que cada página faz

| Página | O que tem |
|---|---|
| **Landing** | Hero, problema, solução, certificação, planos, specs, contato (11 seções de copy) |
| **Dashboard** | Status do rebanho ao vivo (lê da API do backend) |

## Como rodar

1. `python3 -m http.server` na pasta (ou Go Live no VSCode).
2. Para o formulário/contato: preencha as chaves do Supabase em `js/contact.js`.
3. Com o backend rodando, o dashboard mostra telemetria real.

## Estrutura

```
monitoramento-animal-site/
├── index.html          # landing (hero, problema, solução, certificação, planos, specs, contato)
├── dashboard.html      # status do rebanho ao vivo (lê da API do backend)
├── css/                # variables, components, style (identidade verde DataBov)
├── js/main.js          # reveal + demo do acelerômetro
├── js/dashboard.js     # telemetria e alertas da API
├── js/contact.js       # form de contato -> Supabase (preencha as chaves)
└── assets/             # databov-logo.png (logo), favicon
```

## Personalizar

1. Chaves do Supabase em `js/contact.js`.
2. Textos em `index.html` (seguem o documento de copy de 11 seções).
3. Deploy: conectar o repo na Vercel (site estático, zero config).

## Stack

HTML · CSS · JavaScript. Backend em [`rebanho-vivo-backend`](https://github.com/Wagner-Schemmer/rebanho-vivo-backend).

## Quem faz

<a href="https://github.com/Wagner-Schemmer/monitoramento-animal-site/graphs/contributors"><img src="https://contrib.rocks/image?repo=Wagner-Schemmer/monitoramento-animal-site" alt="contribuidores" /></a>

## Star history

<a href="https://www.star-history.com/#Wagner-Schemmer/monitoramento-animal-site&Date"><img alt="Star History" src="https://api.star-history.com/svg?repos=Wagner-Schemmer/monitoramento-animal-site&type=Date" /></a>

---
Feito por [Wagner Schemmer](https://wagner-port.vercel.app) · [Portfólio](https://wagner-port.vercel.app) · [LinkedIn](https://www.linkedin.com/in/wagner-schemmer-martins-46950627a)
