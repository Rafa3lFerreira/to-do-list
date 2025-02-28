import { User, getTasks } from "../models/Models.js"
import bcrypt from 'bcryptjs';

export async function createUser(req, res) {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        res.status(400).json({ message: "Erro ao cadastrar usuário", error });
    }
}
export async function createTask(req, res) {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: "Erro ao criar tarefa" });
    }
};

export async function listTask(req, res) {
    try {
        const tasks = await getTasks();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Erro ao listar tarefas" });
    };
}

export async function updateTask(req, res) {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar tarefa" });
    }
}

export async function deleteTask(req, res) {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Tarefa deletada" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao deletar tarefa" });
    }
}
