import express from "express";
import { createTask, listTask, updateTask, deleteTask, createUser} from "../controller/TaskController.js";
import cors from 'cors';

const routes = (app) => {
    app.use(express.json());
    app.use(cors());

    app.post('/tasks/create', createTask)
    app.get('/tasks/read', listTask)
    app.put('/tasks/update/:id', updateTask)
    app.delete('/tasks/delete/:id', deleteTask)
    app.post('/user/create', createUser)
}

export default routes;
