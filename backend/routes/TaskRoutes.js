import express from "express";
import { createUser, loginUser, listUser, createList } from "../controller/TaskController.js";
import cors from 'cors';

const routes = (app) => {
    app.use(express.json());
    app.use(cors());

    app.post("/user/create", createUser);
    app.post("/user/login", loginUser);
    app.get("/user/list", listUser);
    app.post("/list/create", createList);
}

export default routes;
