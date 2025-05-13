import express from "express";
import { createUser, loginUser, listUser, createList, allList, createTask, deleteList, deleteUser } from "../controller/TaskController.js";
import cors from 'cors';

const routes = (app) => {
    app.use(express.json());
    app.use(cors());

    // User routes
    app.post("/user/create", createUser);
    app.post("/user/login", loginUser);
    app.get("/user/list", listUser);
    app.delete("/user/delete", deleteUser);


    // List and task routes
    app.post("/list/create", createList);
    app.get("/list/allLists", allList);
    app.post("/list/taskCreate", createTask);
    app.delete("/list/delete", deleteList);
}

export default routes;
