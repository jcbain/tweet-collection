DROP TABLE IF EXISTS main_jobs CASCADE;
DROP TABLE IF EXISTS temp_jobs CASCADE;
DROP TABLE IF EXISTS all_jobs CASCADE;
DROP TABLE IF EXISTS tweets CASCADE;
DROP TABLE IF EXISTS referenced_tweets;
DROP TABLE IF EXISTS tweet_metrics;

CREATE TABLE main_jobs (
    id SERIAL PRIMARY KEY,
    query TEXT UNIQUE,
    description_text TEXT
);

CREATE TABLE temp_jobs (
    id SERIAL PRIMARY KEY,
    query TEXT UNIQUE
);

CREATE TABLE all_jobs (
    id SERIAL PRIMARY KEY,
    query TEXT UNIQUE
);

CREATE TABLE tweets (
    id TEXT PRIMARY KEY,
    tweet_text TEXT,
    author_id TEXT,
    created_at TIMESTAMP,
    conversation_id TEXT,
    lat DECIMAL,
    lng DECIMAL,
    lang TEXT,
    job_query TEXT,
    FOREIGN KEY (job_query) 
        REFERENCES all_jobs (query)
);

CREATE TABLE referenced_tweets (
    tweet_id TEXT,
    conversation_id TEXT,
    reference_type TEXT,
    PRIMARY KEY (tweet_id, conversation_id),
    FOREIGN KEY (tweet_id)
        REFERENCES tweets (id)
);

CREATE TABLE tweet_metrics (
    tweet_id TEXT,
    collected_at TIMESTAMP,
    retweet_count INT,
    reply_count INT,
    like_count INT, 
    quote_count INT,
    PRIMARY KEY (tweet_id, collected_at),
    FOREIGN KEY (tweet_id)
        REFERENCES tweets (id)
);


