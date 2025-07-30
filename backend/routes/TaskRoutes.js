import express from "express";
import { createUser, loginUser, listUser, listUserById, createList, allList, createTask, listTodayTask, updateTask, deleteList, deleteUser, createLog, searchLog } from "../controller/TaskController.js";
import cors from 'cors';

const routes = (app) => {
    app.use(express.json());
    app.use(cors());

    // User routes
    app.post("/user/create", createUser);
    app.post("/user/login", loginUser);
    app.get("/user/list", listUser);
    app.get("/user/list/:id", listUserById);
    app.delete("/user/delete", deleteUser);

    // List and task routes
    app.post("/list/create", createList);
    app.get("/list/allLists", allList);
    app.post("/list/taskCreate", createTask);
    app.get("/list/todayTask", listTodayTask)
    app.put("/list/updateTask", updateTask);
    app.delete("/list/delete", deleteList);

    // Logs route
    app.post("/log/create", createLog);
    app.get("/log/search", searchLog);
}

export default routes;
