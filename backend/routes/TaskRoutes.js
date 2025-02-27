import express from "express";
import { createTask, listTask, updateTask, deleteTask} from "../controller/TaskController.js";
import cors from 'cors';

const routes = (app) => {
    app.use(express.json());
    app.use(cors());

    app.use('/tasks/create', createTask)
    app.use('/tasks/read', listTask)
    app.use('/tasks/update/:id', updateTask)
    app.use('/tasks/delete/:id', deleteTask)
}

export default routes;
