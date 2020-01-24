

exports.up = function(knex) {
    return knex.schema.createTable('projects', table => {
        table.increments();
        table.string('name', 128).notNullable().index();
        table.text('description');
        table.boolean('completed').defaultTo(false);
    })
      .createTable('resources', table => {
          table.increments();
          table.string('name').index().notNullable().unique();
          table.text('description');
      })
      .createTable('tasks', table => {
          table.increments();
          table.integer('project_id').notNullable()
              .references('id').inTable('projects')
              .onDelete('CASCADE').onUpdate('CASCADE');
          table.text('description').notNullable();
          table.text('notes');
          table.boolean('completed').defaultTo(false);
      })
      .createTable('project_resources', table => {
          table.increments();
          table.integer('project_id')
              .references('id').inTable('projects')
              .onDelete('CASCADE').onUpdate('CASCADE');
          table.integer('resource_id')
              .references('id').inTable('resources')
              .onDelete('CASCADE').onUpdate('CASCADE');
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('project_resources')
      .dropTableIfExists('tasks')
      .dropTableIfExists('resources')
      .dropTableIfExists('projects');
  };
