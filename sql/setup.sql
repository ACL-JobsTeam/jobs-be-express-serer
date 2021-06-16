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
-- user1 - abc123

-- INSERT INTO users (username, email, password) 
-- 	VALUES 
--     	('user1', 'one@one.com', '$2b$12$E/.Xntp5e082S0uxhTx6N.ldDqdPkgNDVO4eRKOvEAnoPKCWPncYu');

-- INSERT INTO columns (name, col_position, job_pos, linked_user_id) 
-- 	VALUES 
--       ('progress', '0', '{700, 701, 702}', '100'),
--     	('todo', '1', '{703, 704}', '100'),
--       ('offer', '2', '{705}', '100');


-- INSERT INTO job_apps (position, company, job_url, linked_user_id)
--   VALUES
--       ('SWE A', 'Amazon', 'http://a', '100');
--       ('SWE B', 'Google', 'http://b', '100'),
--       ('SWE C', 'Reddit', 'http://c', '100'),
--       ('SWE D', 'Twitter', 'http://d', '100'),
--       ('SWE E', 'FB', 'http://e', '100'),
--       ('SWE F', 'Insta', 'http://f', '100');

-- UPDATE columns SET job_pos='{708}' WHERE column_id=504;
