DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS tweets CASCADE;

CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    query TEXT,
    last_run TIMESTAMP,
    description_text TEXT
);

CREATE TABLE tweets (
    id TEXT PRIMARY KEY,
    tweet_text TEXT,
    author_id TEXT,
    created_at TIMESTAMP,
    conversation_id TEXT,
    lat DECIMAL,
    lng DECIMAL,
    job_id INT,
    FOREIGN KEY (job_id) 
        REFERENCES jobs (id)
);


