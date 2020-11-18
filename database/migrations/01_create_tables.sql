DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS tweets CASCADE;
DROP TABLE IF EXISTS referenced_tweets;
DROP TABLE IF EXISTS tweet_metrics;

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
    lang TEXT,
    job_id INT,
    FOREIGN KEY (job_id) 
        REFERENCES jobs (id)
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


