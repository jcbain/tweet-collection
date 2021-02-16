
exports.up = function(knex, Promise) {
    return knex.schema.table('tweets', t => {
        t.boolean('possibly_sensitive');
    });
  
};

exports.down = function(knex, Promise) {
    return knex.schema.table('tweets', t => {
        t.dropColumn('possibly_sensitive')
    });
};
