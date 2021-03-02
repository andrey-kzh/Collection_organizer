--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: catalog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.catalog (
    id integer NOT NULL,
    user_id integer,
    image character varying(256),
    title text,
    title_idx tsvector,
    anons text,
    anons_idx tsvector
);


ALTER TABLE public.catalog OWNER TO postgres;

--
-- Name: catalog_id_catalog_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.catalog_id_catalog_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.catalog_id_catalog_seq OWNER TO postgres;

--
-- Name: catalog_id_catalog_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.catalog_id_catalog_seq OWNED BY public.catalog.id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    title character varying(128),
    user_id integer
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.category.id;


--
-- Name: related_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.related_category (
    id integer NOT NULL,
    catalog_id integer,
    category_id integer
);


ALTER TABLE public.related_category OWNER TO postgres;

--
-- Name: related_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.related_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.related_categories_id_seq OWNER TO postgres;

--
-- Name: related_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.related_categories_id_seq OWNED BY public.related_category.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer,
    token text,
    last_visit timestamp without time zone
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: session_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.session_id_seq OWNER TO postgres;

--
-- Name: session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.session_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(32),
    login character varying(32),
    password text,
    salt text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: catalog id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.catalog ALTER COLUMN id SET DEFAULT nextval('public.catalog_id_catalog_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: related_category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.related_category ALTER COLUMN id SET DEFAULT nextval('public.related_categories_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.session_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: catalog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.catalog (id, user_id, image, title, title_idx, anons, anons_idx) FROM stdin;
46	41	/img/test1.jpg	Простой запрос	'запрос':2 'прост':1	анонс для теста	'анонс':1 'тест':3
48	41	/img/test2.jpg	Тестовый заголовок2	'заголовок2':2 'тестов':1	Тестовый анонс2	'анонс2':2 'тестов':1
49	41	/img/test1.jpg	Запрос	'запрос':1	анонс	'анонс':1
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, title, user_id) FROM stdin;
8	Пластинки	41
9	Диски	41
10	Кассеты	41
\.


--
-- Data for Name: related_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.related_category (id, catalog_id, category_id) FROM stdin;
145	48	8
146	48	9
147	49	8
148	49	9
149	49	10
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, user_id, token, last_visit) FROM stdin;
8	41	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQxLCJpYXQiOjE2MTQxNjk2OTV9.0KUq0bEAdNsK2qVj8xGVWH0PbQODpPDtP4w9pduQIe4	2021-03-02 17:37:08.312
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, login, password, salt) FROM stdin;
41	Андрей	test	40abac5ea0d0c22366d89915fe9805a3c82598731494b2e78e2f0b2dcb2094aedd61268df803abf9efff5e2b578e473dd22ed3b9129eb7ded1b0636be91e0bfd97f68c48998d509e278c2989ef99928a6160932ebdee5119046e8f3c458eca7eb77ae966cc26dcf15d39df9bc1e99a15855ef27e68841988eb00a879fccae6f3	d879900215e918ff1d73d1a22d0dacf8ad5aceff998e1b93b8c25232052682ad60a0c3be336a1c0c84f35f16f5648185af05c44d9dec2402f72ad68084414b4245d82ef632b5b1b1f8eab724972daccfe45d0ff07a323ef8c2a3c3993495bff8b030d0959f88d7b036bb97e72d4124ab32d37a59c4ca195bd0a405e84bc8ffb7
\.


--
-- Name: catalog_id_catalog_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.catalog_id_catalog_seq', 49, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 10, true);


--
-- Name: related_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.related_categories_id_seq', 149, true);


--
-- Name: session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.session_id_seq', 8, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 41, true);


--
-- Name: catalog catalog_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.catalog
    ADD CONSTRAINT catalog_pk PRIMARY KEY (id);


--
-- Name: catalog_anons_idx_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX catalog_anons_idx_index ON public.catalog USING gin (anons_idx);


--
-- Name: catalog_id_catalog_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX catalog_id_catalog_uindex ON public.catalog USING btree (id);


--
-- Name: catalog_title_idx_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX catalog_title_idx_index ON public.catalog USING gin (title_idx);


--
-- Name: categories_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX categories_id_uindex ON public.category USING btree (id);


--
-- Name: related_categories_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX related_categories_id_uindex ON public.related_category USING btree (id);


--
-- Name: related_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX related_index ON public.related_category USING btree (catalog_id, category_id);


--
-- Name: session_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX session_id_uindex ON public.sessions USING btree (id);


--
-- Name: token_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX token_index ON public.sessions USING btree (token);


--
-- Name: user_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_index ON public.sessions USING btree (user_id);


--
-- Name: users_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_id_uindex ON public.users USING btree (id);


--
-- Name: users_login_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_login_uindex ON public.users USING btree (login);


--
-- Name: TABLE catalog; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.catalog TO coluser;


--
-- Name: SEQUENCE catalog_id_catalog_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.catalog_id_catalog_seq TO coluser;


--
-- Name: TABLE category; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.category TO coluser;


--
-- Name: SEQUENCE categories_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.categories_id_seq TO coluser;


--
-- Name: TABLE related_category; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.related_category TO coluser;


--
-- Name: SEQUENCE related_categories_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.related_categories_id_seq TO coluser;


--
-- Name: TABLE sessions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.sessions TO coluser;


--
-- Name: SEQUENCE session_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.session_id_seq TO coluser;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.users TO coluser;


--
-- Name: SEQUENCE users_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.users_id_seq TO coluser;


--
-- PostgreSQL database dump complete
--

