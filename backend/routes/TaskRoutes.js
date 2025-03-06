import express from "express";
import { createUser, loginUser } from "../controller/TaskController.js";
import cors from 'cors';

const routes = (app) => {
    app.use(express.json());
    app.use(cors());

    app.post("/user/create", createUser);
    app.post("/user/login", loginUser);
}

export default routes;
