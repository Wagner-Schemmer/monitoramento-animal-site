# DataBov — Bem-Estar Animal Monitorado e Certificado

Landing page de vendas + dashboard do sistema DataBov: coleira inteligente com IA para Compost Barn e Freestall, com índice de bem-estar certificável de 1 a 5.

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

## Rodar
Go Live no VSCode ou `python3 -m http.server` na pasta.

## Copy
Textos em `index.html` seguem o documento `databov_conteudo_pagina_vendas.pdf` (11 seções).

## Backend
Ver `rebanho-vivo-backend/` (API MQTT + TimescaleDB + firmware ESP8266).
