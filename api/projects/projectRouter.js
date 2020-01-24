const express = require('express');
const projects = require('./project-model.js');

const router = express.Router();


//GET all the projects
router.get('/', (req, res) => {
    projects.getProjects()
    .then(response => {
        return res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong." });
    })
})


//POST a project to projects
router.post('/', (req, res) => {
    if (req.body) {
        projects.addProject(req.body)
        .then(response => {
            projects.getProjectById(Number(response))
            .then(resp => {
                return res.status(201).json(resp);
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: "Error posting project." })
        })
    } else {
        return res.status(400).json({ error: "Please add required field." })
    }
})


//GET resources list
router.get('/resources', (req, res) => {
    projects.getResources()
    .then(response => {
        return res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Error getting resources." })
    })
})


//POST a resource to resources
router.post('/resources', (req, res) => {
    if (req.body) {
        projects.addResource(req.body)
        .then(response => {
            projects.getResourceById(Number(response))
            .then(resp => {
                return res.status(201).json(resp);
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: "Error adding resource." })
        })
    } else {
        return res.status(400).json({ error: "Something went wrong." })
    }
})


//GET all tasks
router.get('/tasks', (req, res) => {
    projects.getTasks()
    .then(response => {
        return res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Error getting tasks." })
    })
})


//GET tasks by id
router.post('/tasks/:id', (req, res) => {
    const { id } = req.params;
    if (!req.body.description) {
        return res.status(400).json({ error: "Description is required." });
    } else {
        const sendPackage = {
            ...req.body,
            project_id: id
        }
        projects.addTask(sendPackage)
        .then(response => {
            projects.getTaskById(Number(response))
            .then(resp => {
                return res.status(201).json(resp);
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: "Something went wrong adding a task." })
        })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const task = await projects.getTaskById(id);
    const resource = await projects.getResourceById(id);
    const project = await projects.getProjectById(id);

    if (task, resource, project) {
        return res.status(200).json({
            ...project,
            tasks: task,
            resources: resource
        })
    } else {
        return res.status(500).json({ error: "Something went wrong." })
    }
})

module.exports = router;