create table
    public.address (
        id uuid not null default gen_random_uuid (),
        street text not null,
        city text not null,
        state text not null,
        zip_code text not null,
        is_disabled boolean not null default false,
        created_at timestamp with time zone not null default now(),
        profile_id uuid null,
        is_ongoing boolean not null default false,
        is_default boolean null default false,
        start timestamp with time zone null default (now() at time zone 'utc'::text),
        end timestamp with time zone null default (now() at time zone 'utc'::text),
        constraint address_pkey primary key (id),
        constraint address_profile_id_fkey foreign key (profile_id) references profile (id)
    ) tablespace pg_default;

create table
    public.education (
        id uuid not null default gen_random_uuid (),
        profile_id uuid not null,
        school text not null,
        start date not null,
        end date null,
        degree text not null,
        is_disabled boolean not null default false,
        created_at timestamp with time zone not null default (now() at time zone 'utc'::text),
        modified_at timestamp with time zone not null default (now() at time zone 'utc'::text),
        is_ongoing boolean not null default false,
        major text not null default '',
        constraint education_pkey primary key (id),
        constraint education_profile_id_fkey foreign key (profile_id) references profile (id)
    ) tablespace pg_default;

--
create table
    public.experience (
        id uuid not null default gen_random_uuid (),
        profile_id uuid not null,
        is_disabled boolean not null default false,
        title text not null,
        description text not null,
        city text not null,
        company text not null,
        start date not null,
        end date null,
        created_at timestamp with time zone not null default (now() at time zone 'utc'::text),
        modified_at timestamp with time zone not null default (now() at time zone 'utc'::text),
        is_ongoing boolean not null default false,
        constraint work_pkey primary key (id),
        constraint experience_profile_id_fkey foreign key (profile_id) references profile (id)
    ) tablespace pg_default;

create table
    public.like (
        id uuid not null default gen_random_uuid (),
        profile_id uuid not null,
        fan_id uuid not null,
        is_disabled boolean not null default false,
        created_at timestamp with time zone not null default (now() at time zone 'utc'::text),
        modified_at timestamp with time zone not null default (now() at time zone 'utc'::text),
        description text null default '',
        constraint like_pkey primary key (id),
        constraint like_fan_id_fkey foreign key (fan_id) references profile (id),
        constraint like_profile_id_fkey foreign key (profile_id) references profile (id)
    ) tablespace pg_default;

create table
    public.phone (
        id uuid not null default gen_random_uuid (),
        profile_id uuid not null,
        phone text not null,
        is_disabled boolean not null default false,
        created_at timestamp with time zone not null default now(),
        catalog text not null default '',
        is_default boolean null default false,
        constraint phone_pkey primary key (id),
        constraint phone_profile_id_fkey foreign key (profile_id) references profile (id)
    ) tablespace pg_default;

create table
    public.profile (
        id uuid not null default gen_random_uuid (),
        first_name character varying not null,
        last_name character varying not null,
        created_at timestamp with time zone not null default now(),
        is_disabled boolean not null default false,
        constraint person_pkey primary key (id)
    ) tablespace pg_default;

create table
    public.skill (
        id uuid not null default gen_random_uuid (),
        profile_id uuid null,
        skill text not null,
        created_at timestamp with time zone not null default (now() at time zone 'utc'::text),
        experience_id uuid null,
        constraint skill_pkey primary key (id),
        constraint skill_experience_id_fkey foreign key (experience_id) references experience (id),
        constraint skill_profile_id_fkey foreign key (profile_id) references profile (id)
    ) tablespace pg_default;