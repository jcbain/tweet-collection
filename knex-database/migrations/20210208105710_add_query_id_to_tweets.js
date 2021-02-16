
exports.up = function(knex, Promise) {
    return knex.schema.table('tweets', t => {
        t.string('query');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('tweets', t => {
        t.dropColumn('query')
    });
  
};
