DROP TABLE IF EXISTS all_jobs;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS columns CASCADE;
DROP TABLE IF EXISTS job_apps CASCADE;
DROP SEQUENCE IF EXISTS users_user_id_seq CASCADE;
DROP SEQUENCE IF EXISTS columns_column_id_seq CASCADE;
DROP SEQUENCE IF EXISTS job_apps_app_id_seq CASCADE;


CREATE TABLE all_jobs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT,
    company TEXT,
    url TEXT,
    post_date DATE,
    location TEXT 
);

CREATE TABLE notes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_note TEXT
);

CREATE TABLE events (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    event_name TEXT,
    event_date DATE
);

CREATE TABLE questions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_question TEXT
);

CREATE TABLE contacts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_contact TEXT
);


CREATE SEQUENCE users_user_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 100
  CACHE 1;

CREATE TABLE users (
  id BIGINT PRIMARY KEY NOT NULL DEFAULT nextval('users_user_id_seq'),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);


CREATE SEQUENCE columns_column_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 500
  CACHE 1;

CREATE TABLE columns (
  column_id BIGINT PRIMARY KEY NOT NULL DEFAULT nextval('columns_column_id_seq'),
  name TEXT,
  col_position INT,
  job_pos INT ARRAY,
  linked_user_id INT,
  CONSTRAINT fk_user
  	FOREIGN KEY(linked_user_id) 
  		REFERENCES users(id)
  		ON DELETE SET NULL
);


CREATE SEQUENCE job_apps_app_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 700
  CACHE 1;

CREATE TABLE job_apps (
  app_id BIGINT PRIMARY KEY NOT NULL DEFAULT nextval('job_apps_app_id_seq'),
  position TEXT,
  company TEXT,
  job_url TEXT,
  linked_user_id INT,
  CONSTRAINT fk_user
  	FOREIGN KEY(linked_user_id) 
  		REFERENCES users(id)
  		ON DELETE SET NULL
);

-- INSERTING TEST DATA BELOW

-- INSERT INTO users (username, email, password) 
-- 	VALUES 
--     	('user1', 'one@one.com', 'abc123'),
--     	('user2', 'two@two.com', 'abc123'), 
--     	('user3', 'three@three.com', 'abc123');

-- INSERT INTO columns (name, col_position, job_pos, linked_user_id) 
-- 	VALUES 
--     	('todo', '1', '{700, 702}', '100'),
--       ('progress', '0', '{701, 703, 705}', '100'),
--       ('offer', '2', '{704}', '100'),
--       ('rejected', '3', '{707, 706}', '100');

-- INSERT INTO job_apps (position, company, job_url, linked_user_id)
--   VALUES
--       ('SWE A', 'Amazon', 'http://a', '100'),
--       ('SWE B', 'Google', 'http://b', '100'),
--       ('SWE C', 'Reddit', 'http://c', '100'),
--       ('SWE D', 'Twitter', 'http://d', '100'),
--       ('SWE E', 'FB', 'http://e', '100'),
--       ('SWE F', 'Insta', 'http://f', '100'),
--       ('SWE G', 'Twilio', 'http://g', '100'),
--       ('SWE H', 'Yahoo', 'http://h', '100'),
--       ('SWE I', 'Stripe', 'http://i', '100');

-- UPDATE columns SET job_pos='{708}' WHERE column_id=504;
