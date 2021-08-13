-- DROP TABLE IF EXISTS all_jobs;
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


-- CREATE TABLE all_jobs (
--     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     title TEXT,
--     company TEXT,
--     url TEXT,
--     post_date DATE,
--     location TEXT 
-- );




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
  is_archive BOOL DEFAULT FALSE,
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

CREATE TABLE notes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_note TEXT,
    linked_app BIGINT,
    CONSTRAINT fk_app
      FOREIGN KEY(linked_app)
        REFERENCES job_apps(app_id)
        ON DELETE SET NULL
);

CREATE TABLE events (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    event_name TEXT,
    event_date DATE,
    linked_app BIGINT,
    CONSTRAINT fk_app
      FOREIGN KEY(linked_app)
        REFERENCES job_apps(app_id)
        ON DELETE SET NULL
);

CREATE TABLE questions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_question TEXT,
    linked_app BIGINT,
    CONSTRAINT fk_app
      FOREIGN KEY(linked_app)
        REFERENCES job_apps(app_id)
        ON DELETE SET NULL
);

CREATE TABLE contacts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_contact TEXT,
    linked_app BIGINT,
    CONSTRAINT fk_app
      FOREIGN KEY(linked_app)
        REFERENCES job_apps(app_id)
        ON DELETE SET NULL
);

-- INSERTING TEST DATA BELOW

-- INSERT INTO users (username, email, password) 
-- 	VALUES 
--     	('jobseeker', 'one@one.com', '$2b$12$E/.Xntp5e082S0uxhTx6N.ldDqdPkgNDVO4eRKOvEAnoPKCWPncYu');

-- INSERT INTO columns (name, col_position, is_archive, job_pos, linked_user_id) 
-- 	VALUES 
--       ('Storage', '0', 'true', '{}', '100');

-- INSERT INTO columns (name, col_position, job_pos, linked_user_id) 
-- 	VALUES 
--       ('To Do', '1', '{700, 701, 702}', '100'),
--     	('In Progress', '2', '{703, 704}', '100'),
--       ('Waiting', '3', '{705}', '100');

-- INSERT INTO job_apps (position, company, job_url, linked_user_id)
--   VALUES
--       ('Software Engineer, AppSec', 'Stripe', 'https://stripe.com/jobs?gh_jid=3117424', '100'),
--       ('Software Engineer, Full-stack', 'Strava', 'https://boards.greenhouse.io/strava/jobs/2924484', '100'),
--       ('Ops Engineer', 'Lyft', 'https://boards.greenhouse.io/lyft/jobs/5277277002?gh_jid=5277277002', '100'),
--       ('Software Engineer, ML', 'Coinbase', 'https://www.coinbase.com/careers/2416374?gh_jid=2416374', '100'),
--       ('Software Engineer, Server', 'Strava', 'https://boards.greenhouse.io/strava/jobs/2927224', '100'),
--       ('Software Engineer, App Core', 'GitHub', 'https://boards.greenhouse.io/github/jobs/3005977', '100');

