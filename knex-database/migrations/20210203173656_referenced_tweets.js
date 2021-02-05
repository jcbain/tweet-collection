
exports.up = function(knex, Promise) {
    return knex.schema.createTable('referenced_tweets', (t) => {
        t.text('tweet_id');
        t.text('conversation_id');
        t.text('reference_type');
        t.primary(['tweet_id', 'conversation_id'])
        t.foreign('tweet_id').references('id').inTable('tweets');
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('referenced_tweets');
};

