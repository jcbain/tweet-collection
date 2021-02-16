
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tweets', (t) => {
        t.text('id').primary();
        t.text('tweet_text');
        t.text('author_id');
        t.timestamp('created_at');
        t.double('lat');
        t.double('lng');
        t.string('lang', 10);
    }) 
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tweets');
};
