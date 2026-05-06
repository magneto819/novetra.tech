create table if not exists public.site_content (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

alter table public.site_content enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
on public.site_content
for select
using (true);

drop policy if exists "Admin can insert site content" on public.site_content;
create policy "Admin can insert site content"
on public.site_content
for insert
to authenticated
with check ((auth.jwt() ->> 'email') = 'magneto.zhao@gmail.com');

drop policy if exists "Admin can update site content" on public.site_content;
create policy "Admin can update site content"
on public.site_content
for update
to authenticated
using ((auth.jwt() ->> 'email') = 'magneto.zhao@gmail.com')
with check ((auth.jwt() ->> 'email') = 'magneto.zhao@gmail.com');

drop policy if exists "Admin can delete site content" on public.site_content;
create policy "Admin can delete site content"
on public.site_content
for delete
to authenticated
using ((auth.jwt() ->> 'email') = 'magneto.zhao@gmail.com');

create or replace function public.set_site_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  new.updated_by = auth.uid();
  return new;
end;
$$;

drop trigger if exists set_site_content_updated_at on public.site_content;
create trigger set_site_content_updated_at
before insert or update on public.site_content
for each row
execute function public.set_site_content_updated_at();
