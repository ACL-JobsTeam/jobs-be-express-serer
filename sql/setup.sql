DROP TABLE IF EXISTS all_jobs;

CREATE TABLE all_jobs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT,
    company TEXT,
    url TEXT,
    post_date DATE
)