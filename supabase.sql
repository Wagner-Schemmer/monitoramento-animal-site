-- RebanhoVivo site — rode no SQL Editor do Supabase
create table if not exists contacts (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  message text not null,
  source text default 'site'
);

alter table contacts enable row level security;

-- Permite insert anônimo (form público), leitura só autenticada
create policy "insert público"
  on contacts for insert to anon with check (true);
