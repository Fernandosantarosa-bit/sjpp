# Configuração segura do primeiro administrador — S.J.P.P.

Este projecto não cria contas administrativas automaticamente. O primeiro utilizador deve ser criado manualmente por uma pessoa autorizada no painel Supabase.

## 1. Criar a conta de autenticação

1. Abra o projecto Supabase **sjpp-oficial**.
2. Entre em **Authentication → Users**.
3. Escolha **Add user** e introduza o email institucional e uma palavra-passe forte.
4. Confirme a criação e copie o UUID do utilizador.

Não partilhe a palavra-passe por mensagens nem a coloque no repositório.

## 2. Conceder o papel de administrador

No **SQL Editor**, substitua `UUID_DO_UTILIZADOR` pelo UUID copiado e execute:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('UUID_DO_UTILIZADOR', 'admin')
ON CONFLICT (user_id)
DO UPDATE SET role = 'admin';
```

A tabela `user_roles` tem RLS. Só um administrador já autorizado deve poder gerir os papéis; não crie uma função pública de auto-registo administrativo.

## 3. Entrar no painel

Abra:

- Portal: https://sjpp.vercel.app
- Administração: https://sjpp.vercel.app/admin

Entre com o email e a palavra-passe criados no Supabase.

## 4. Variáveis de ambiente

No Vercel, confirme que existem as variáveis de ambiente:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

A chave anon/public pode ser usada no cliente quando as políticas RLS estão correctas. **Nunca** coloque `service_role`, chaves secretas ou tokens administrativos no frontend, no GitHub ou em mensagens.

Depois de alterar variáveis, publique um novo deployment.

## 5. Verificação de segurança

- Confirme que o utilizador consegue entrar no painel.
- Confirme que um visitante não autenticado não consegue ler mensagens.
- Confirme que um editor não consegue atribuir a si próprio o papel de administrador.
- Active MFA na conta administrativa, se disponível.
- Crie apenas contas individuais necessárias e remova o acesso quando deixar de ser necessário.
