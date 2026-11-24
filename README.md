# S.J.P.P. — Portal Institucional

Portal institucional do Partido Social Juntos Pelo Povo, projecto “Eco no Silêncio”.

## Stack
- React + Vite
- Supabase (PostgreSQL, conteúdos institucionais e formulário de contacto)
- GitHub para versionamento
- Vercel para integração e deploy contínuo

## Desenvolvimento
```bash
npm install
cp .env.example .env.local
npm run dev
```

Configure `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` com a URL do projecto e a chave pública/publishable do Supabase. Nunca coloque a service_role key no frontend.

## Publicação
O projecto está preparado para Vercel. Build command: `npm run build`; output directory: `dist`; framework: Vite.

## Conteúdo
O portal apresenta informação institucional, eixos programáticos, notícias, agenda, documentos públicos e formulário de contacto. Notícias, eventos e documentos são carregados das tabelas públicas do Supabase.
