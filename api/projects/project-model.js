const db = require('../../data/db-config.js');

module.exports = {
    getResources,
    addResource,
    addProject,
    getProjects,
    addTask,
    getTasks,
    getProjectById,
    getResourceById,
    getTaskById
}

function getResources() {
    return db('resources');
}

function getResourceById(id) {
    return db('resources').where({ id }).first();
}

function getProjects() {
    return db('projects');
}

function getProjectById(id) {
    return db('projects').where({ id }).first();
}

function addResource(resource) {
    return db('resources').insert(resource);
}

function addProject(project) {
    return db('projects').insert(project);
}

function addTask(task) {
    return db('tasks').insert(task);
}

function getTasks() {
    return db('tasks').join('projects', 'projects.id', 'tasks.id').select('*');
}

function getTaskById(id) {
    return db('tasks').where({ id }).first();
}