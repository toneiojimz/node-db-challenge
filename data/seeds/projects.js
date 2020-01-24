exports.seed = function(knex){

    return knex('projects').truncate()
        .then(function() {
            return knex('projects').insert([
                {id: 1, description: "create database", name: "appie", steps: "gather information, install dependencies, test app"}
            ]);
        });
};