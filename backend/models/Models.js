import conectarAoBanco from "../config/db.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const con = await conectarAoBanco(process.env.STRING_CON);

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const Task = mongoose.model("Task", TaskSchema);

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

const User = mongoose.model('User', userSchema);


export async function getTasks() {
    const db = con.db("to-do-list");
    const colecao = db.collection("lista-fazer");
    return colecao.find().toArray();
}

export { Task, User };
