# S.J.P.P. — publicação no Freebuff e primeiro administrador

## Ligar o projecto ao Freebuff Cloud

O código oficial está em:
https://github.com/Fernandosantarosa-bit/sjpp

1. Abra https://freebuff.com/cloud.
2. Escolha **Continue with GitHub** e autorize o acesso apenas ao repositório `sjpp`.
3. Seleccione `Fernandosantarosa-bit/sjpp`.
4. Aguarde a criação do sandbox e a pré-visualização.
5. Abra a pré-visualização e teste a página inicial e `/admin`.

O Freebuff Cloud cria um ambiente de desenvolvimento e uma pré-visualização para o repositório. A publicação pública principal continua na Vercel: https://sjpp.vercel.app.

## Primeiro utilizador administrador

O painel já está implementado em:
https://sjpp.vercel.app/admin

Por segurança, ainda não existe nenhum utilizador com papel de administrador. Não foi criada uma palavra-passe nem uma conta em nome do proprietário.

1. No Supabase, abra o projecto `sjpp-oficial` (região eu-west-1).
2. Entre em **Authentication → Users → Add user**.
3. Crie o utilizador com o email que ficará responsável pelo painel e defina uma palavra-passe forte. Confirme o email no painel se necessário.
4. Copie o UUID desse utilizador.
5. Abra **SQL Editor** e execute, substituindo o UUID:

```sql
insert into public.user_roles (user_id, role)
values ('COLOQUE-AQUI-O-UUID-DO-UTILIZADOR'::uuid, 'admin')
on conflict (user_id) do update set role = 'admin';
```

6. Aceda a https://sjpp.vercel.app/admin e entre com o email e a palavra-passe criados.

## O que o painel permite

- Criar e publicar notícias e comunicados.
- Criar eventos na agenda.
- Adicionar documentos públicos através de URL.
- Criar e gerir páginas institucionais.
- Consultar mensagens de contacto e marcá-las como lidas.

As permissões são verificadas pela base de dados através de RLS. Não colocar chaves `service_role` no navegador.

## Stack e endereços

- GitHub: https://github.com/Fernandosantarosa-bit/sjpp
- Vercel: https://sjpp.vercel.app
- Supabase URL: https://lvseyhtjwlvaoxqveuup.supabase.co
- Freebuff Cloud: https://freebuff.com/cloud

O logótipo oficial ainda será aplicado quando for disponibilizado.
