//creates initial schema
exports.up = function(knex, Promise) {
  return createTables(knex, Promise);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('Comment'),
    knex.schema.dropTable('Card'),
    knex.schema.dropTable('Lane'),
    knex.schema.dropTable('Board'),
    knex.schema.dropTable('BoardMember'),
    knex.schema.dropTable('User')
  ])
};


function createTables(knex, Promise){
  return Promise.all([
    //User table
    knex.schema.createTable('User', t => {
      t.increments('id').primary();
      t.string('username', 30).notNullable().unique().index();
      t.string('password', 60).notNullable();
      t.datetime('createdAt').notNullable();
      t.dateTime('lastLogin');
    }),
    //Board
    knex.schema.createTable('Board', t => {
      t.increments('id').primary();
      t.string('title').notNullable().index();
      t.datetime('createdAt').notNullable();
      t.int('authorId').notNullable().references('User.id');
      t.boolean('isPublic').notNullable().defaults(true);
    }),
    //Boards <-> Users membership
    knex.schema.createTable('BoardMember', t => {
      t.int('userId').notNullable().references('User.id');
      t.int('boardId').notNullable().references('Board.id');
      t.boolean('isAdmin').notNullable();
      t.primary(['userId', 'boardId']);
    }),
    //Lane table
    knex.schema.createTable('Lane', t => {
      t.increments('id').primary();
      t.string('title').notNullable();
      t.int('displayOrder').notNullable();
      t.int('authorId').notNullable().references('User.id');
      t.int('boardId').notNullable().references('Board.id');
    }),
    //Card table
    knex.schema.createTable('Card', t => {
      t.increments('id').primary();
      t.string('title', 500).notNullable();
      t.text('description');
      t.datetime('createdAt');
      t.int('authorId').notNullable().references('User.id');
      t.int('laneId').notNullable().references('Lane.id');
    }),
    //Comment table
    knex.schema.createTable('Comment', t => {
      t.increments('id').primary();
      t.string('text', 5000);
      t.datetime('createdAt').notNullable();
      t.int('authorId').notNullable().references('User.id');
      t.int('cardId').notNullable().references('Card.id');
    })
  ]);
}