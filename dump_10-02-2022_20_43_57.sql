--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1 (Debian 14.1-1.pgdg110+1)
-- Dumped by pg_dump version 14.1 (Debian 14.1-1.pgdg110+1)

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

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1 (Debian 14.1-1.pgdg110+1)
-- Dumped by pg_dump version 14.1 (Debian 14.1-1.pgdg110+1)

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


-- Data for Name: Exercise; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Exercise" (name, id, grip) FROM stdin;
Pull-Down Barra	1	\N
Remada Unilateral	2	SUPINE
Remada Cross	3	\N
Remada Curvada Halteres	4	\N
Rosca Inversa Cross	5	\N
Rosca Inversa Barra	6	\N
Manguito Rotador Externo Halteres	7	\N
Elevação Lateral Sentado Halteres	8	\N
Remada Alta Barra	9	\N
Rosca Direta Barra Reta ou Barra W	10	\N
Rosca Direta Cross	11	\N
Rosca Alternada Halteres	12	\N
Tríceps Coice Unilateral Halteres	13	\N
Rosca Testa Halteres	14	\N
Infra	15	\N
Oblíquos	16	\N
\.


--
-- Data for Name: ExerciseTechnique; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ExerciseTechnique" (name, id, explanation) FROM stdin;
\.


--
-- Data for Name: ExerciseSerie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ExerciseSerie" (id, repetitions, times, "exerciseTechniqueId", "maxRestTime", "minRestTime") FROM stdin;
\.

--
-- Data for Name: Measurement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Measurement" ("createdAt", id, weight, student_id, arm_left, arm_right, calf_left, calf_right, chest, forearm_left, forearm_right, hips, shoulders, thigh_left, thigh_right, waist) FROM stdin;
\.


--
-- Data for Name: MuscleGroup; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MuscleGroup" (name, id) FROM stdin;
Tríceps	1
Dorsal	3
Peitoral	4
Abdômen	7
Bíceps	2
Deltóides	9
Trapézio	10
Coxa	5
Panturrilha	6
Antebraço	8
\.


--
-- Data for Name: Picture; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Picture" (url, id, student_id) FROM stdin;
\.


--
-- Data for Name: TrainingPlanningType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TrainingPlanningType" (name, id, explanation, "defaultMaxRestTime", "defaultMinRestTime") FROM stdin;
Hipertrofia	1		45	60
Força	2		60	90
Resistência	3		30	45
\.


--
-- Data for Name: TrainingPlanning; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TrainingPlanning" (id, "trainingPlanningTypeId", "studentId", "personalId") FROM stdin;
\.


--
-- Data for Name: Training; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Training" (id, letter, "aerobicMinutes", "trainingPlanningId", "exercisesSeriesOrder", day) FROM stdin;
\.


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VerificationToken" (identifier, token, expires) FROM stdin;
\.


--
-- Data for Name: _ExerciseSerieToTraining; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_ExerciseSerieToTraining" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _ExerciseToExerciseSerie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_ExerciseToExerciseSerie" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _ExerciseToMuscleGroup; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_ExerciseToMuscleGroup" ("A", "B") FROM stdin;
1	3
2	3
3	3
4	3
5	8
6	8
7	9
8	9
9	10
10	2
11	2
12	2
13	1
14	1
15	7
16	7
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
75fa20dc-db76-4d52-aa5a-af6538a88554	4d694c852fc7497e672b504cc45efb2a0c33e12e6ccff80a6f3af7ca24632a39	2022-01-18 04:18:22.035796+00	20211209165126_init	\N	\N	2022-01-18 04:18:21.998599+00	1
e01ac61f-79b1-461d-9da8-2fcdb5641a3a	bb4c9b362921da605d7c99d2b79fbdfe5c30cb8dc2b34d21d44874cd550256d3	2022-01-18 04:18:22.302119+00	20211227022912_add_personal_plannings	\N	\N	2022-01-18 04:18:22.293347+00	1
1c738753-54ee-42af-b2b5-adef19b79727	7cbeb07778cbf35e7ffb94e3cb4085388310b7afa9f89fb06ed1a10326bd193b	2022-01-18 04:18:22.140254+00	20211210043724_training_models	\N	\N	2022-01-18 04:18:22.038762+00	1
77ab1ba3-32e0-438c-a1c1-d8b18dfe12ea	045ce6bddbc5c1122b6b8e101890d0a1f1d1081cff1af1274ce726dbae83e1cf	2022-01-18 04:18:22.152802+00	20211210044533_add_grip	\N	\N	2022-01-18 04:18:22.143528+00	1
2dc1c905-92ad-4e0f-921c-a034583cc69c	c0409db46661da639204a0c7554e62dfaae7c9e55197a9a175742e0c7f2e535a	2022-01-18 04:18:22.165866+00	20211223195615_add_measurement_columns	\N	\N	2022-01-18 04:18:22.155886+00	1
4debb0e1-9a69-4d29-990e-e1d73e035e9b	0baef6a002be130578a1dfaecf2bd49e6ee553eec7414f43edf03c84af9e2d09	2022-01-18 04:18:22.326458+00	20211227025203_add_user	\N	\N	2022-01-18 04:18:22.305532+00	1
9cd87b15-ce80-4702-b99e-4a301dbb58ac	f76b58ec01d4556069cfe93ed2add44ecd87d7913e415cd2813867eaa1961841	2022-01-18 04:18:22.17709+00	20211224211254_student_age_optional	\N	\N	2022-01-18 04:18:22.169057+00	1
623a9234-5fde-47b4-b117-3f21da033c58	2856f685d09cb31423c71c09b15078302959393ada29022196a91f5515a61d58	2022-01-18 04:18:22.193788+00	20211224214354_default_rest_time	\N	\N	2022-01-18 04:18:22.180841+00	1
420d9ae6-eb4e-4f7e-8746-effb0645f71b	bad17fdc3045ced43d7176e86a778f2dad14f09f13980df92e76d28b4e0907d4	2022-01-18 04:18:22.209616+00	20211224215125_add_type_to_planning	\N	\N	2022-01-18 04:18:22.197753+00	1
813d2c96-9a62-4bdc-9532-a97ef48de045	82cd8030fba011c49275d3f8178bb206c0b48eff72ba27ce4248a57a9dcc633d	2022-01-18 04:18:22.345932+00	20211227173030_add_user_relations	\N	\N	2022-01-18 04:18:22.329356+00	1
e515a55c-6425-4222-abd8-64f2642ea5d5	a2a109d4fd41a9ae9b487b3956ccdf338630d37cb1db03250ea9a594758eee57	2022-01-18 04:18:22.222652+00	20211224215359_add_planning_to_student	\N	\N	2022-01-18 04:18:22.213176+00	1
ae97de4e-5cde-4075-8519-8d1823ea07d2	c592c3fdbb3085ff59e5fe03e8472d179e7b06245d04e57feac0daed8b276708	2022-01-18 04:18:22.234512+00	20211225180825_grip_to_enum	\N	\N	2022-01-18 04:18:22.22569+00	1
6d2fd7f7-43b4-45b2-a7ff-2bdbe604576a	7886e76041afc414178b53a2b2d312009ff0454a228bfb92f37086365dd23509	2022-01-18 04:18:22.245574+00	20211225181428_optional_technique	\N	\N	2022-01-18 04:18:22.236896+00	1
77003ac2-d268-42e5-a902-1cf112d9b123	48fc08d4c3025c218f86c7cdb3d92bb340b90edf765535b366dc08d1ffa74dd6	2022-01-18 04:18:22.356163+00	20211227174706_remove_default_day_and_fix_personal_column	\N	\N	2022-01-18 04:18:22.348537+00	1
feeb61e5-677b-4a0c-a1ab-e0b27e4b72e4	944d4ef1fcc300c7fd8cc49909d7ac6db1eb98b36fc856687590b4469c3c980a	2022-01-18 04:18:22.255564+00	20211225202544_order_columns	\N	\N	2022-01-18 04:18:22.248696+00	1
aad1c9b1-e673-4de4-afcc-a6011a03bcaa	a68b2631accfb3ab92ba723185db7e6b889df776e6560cb28369c0b956d8dcb0	2022-01-18 04:18:22.26585+00	20211225202606_fix_student_column_name	\N	\N	2022-01-18 04:18:22.257817+00	1
749ab672-5ff8-4844-9aa0-7d92eb79dd05	883b9709f5c5e72d158a4e5a5315d4edc0a59821389a4870b0bc17d74eb4f09b	2022-01-18 04:18:22.290559+00	20211227022732_add_personal_and_day	\N	\N	2022-01-18 04:18:22.269406+00	1
f323e77a-2fdc-403d-9f10-fa0d180d52b2	279fb07117d1867caeafccc6de619889e383bf1ad69d8bfccccc2cb58eec1939	2022-01-18 04:18:22.405693+00	20211230005159_next_auth_schema	\N	\N	2022-01-18 04:18:22.359276+00	1
bd58ef88-883b-4b08-a727-a53b3d98574f	4c4ea5d31a46629e4a5bbd0b7ea35fe29a960a6f8acf8e874005523447aa1b82	2022-01-18 04:18:22.416599+00	20211230005834_remove_user_profile_column	\N	\N	2022-01-18 04:18:22.408402+00	1
\.


--
-- Name: Account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Account_id_seq"', 1, true);


--
-- Name: ExerciseSerie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ExerciseSerie_id_seq"', 1, false);


--
-- Name: ExerciseTechnique_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ExerciseTechnique_id_seq"', 1, false);


--
-- Name: Exercise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Exercise_id_seq"', 16, true);


--
-- Name: Measurement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Measurement_id_seq"', 1, false);


--
-- Name: MuscleGroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MuscleGroup_id_seq"', 10, true);


--
-- Name: Personal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Personal_id_seq"', 1, true);


--
-- Name: Picture_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Picture_id_seq"', 1, false);


--
-- Name: Session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Session_id_seq"', 3, true);


--
-- Name: Student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Student_id_seq"', 4, true);


--
-- Name: TrainingPlanningType_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TrainingPlanningType_id_seq"', 3, true);


--
-- Name: TrainingPlanning_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TrainingPlanning_id_seq"', 1, false);


--
-- Name: Training_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Training_id_seq"', 1, false);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, true);


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

