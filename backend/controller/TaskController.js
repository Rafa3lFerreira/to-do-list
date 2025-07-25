import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Models from "../models/Models.js";

const { User, List, Task, Log } = Models;

export async function createUser(req, res) {
    const { name, email, password, role, img } = req.body;

    try {
        const validaEmail = await User.findOne({ email });
        if (validaEmail) {
            return res.status(400).json({ message: "E-mail já cadastrado!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword, role: role || "user", img });
        await newUser.save();

        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        res.status(400).json({ message: "Erro ao cadastrar usuário", error });
    }
}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const validateEmail = await User.findOne({ email });
        const validatePassword = await bcrypt.compare(password, validateEmail.password);

        if (!validateEmail || !validatePassword) {
            return res.status(400).json({ message: "E-mail ou senha incorretos!" });
        }

        const token = jwt.sign(
            { id: validateEmail._id, name: validateEmail.name, role: validateEmail.role },
            process.env.JWT_SECRET, // Definido isso no .env
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Usuário logado com sucesso!",
            token,
            id: validateEmail._id,
            name: validateEmail.name,
            role: validateEmail.role
        });
    } catch (error) {
        res.status(400).json({ message: "Erro ao logar", error });
    }
}

export async function listUser(req, res) {
    try {
        const users = await User.find().select("id name email role");
        console.log(users);
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ message: "Erro ao listar usuários", error });
    }
}

export async function listUserById(req, res) {
    try {
        id = req.params.id;
        const users = await User.find({_id: id}).select("id name email role");
        console.log(users);
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ message: "Erro ao listar usuários", error });
    }
}
export async function createList(req, res) {
    const { title, description, created_by } = req.body;
    console.log(req);
    try {

        const newList = new List({ title, description, created_by });
        await newList.save();

        res.status(201).json({ message: "Lista cadastrada com sucesso!" });
    } catch (error) {
        res.status(400).json({ message: "Erro ao cadastrar usuários", error });
    }
}

export async function allList(req, res) {
    try {
        const listLists = await List.find();
        console.log(listLists);
        res.status(200).json(listLists);
    }
    catch (error) {
        res.status(400).json({ message: "Erro ao listar usuários", error });
    }
}

export async function deleteList(req, res) {
    try {
        const id = req.query.id;
        await List.deleteOne({ _id: id });
        res.status(200).json({ message: "Lista deletada com sucesso!" });
    } catch (error) {
        res.status(400).json({ message: "Erro ao deletar lista", error });
    }
}

export async function createTask(req, res) {
    const { name, created_by } = req.body;

    try {
        const newTask = new Task({ name, created_by});
        await newTask.save();

        res.status(201).json({ message: "Task cadastrada com sucesso!" })
    } catch (error) {
        res.status(400).json({ message: "Erro ao cadastrar a task", error })
    }
}

export async function deleteUser(req, res) {
    try {
        const id = req.query.id;
        await User.deleteOne({ _id: id });
        res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
        res.status(400).json({ message: "Erro ao deletar usuário", error });
    }
}

export async function createLog(req, res) {
    const { message, level, details, timestamp } = req.body;
    try {
        const newLog = new Log({ message, level, details, timestamp });
        await newLog.save();

        res.status(201).json({ message: "Log criado com sucesso!" });
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar log", error });
    }
}

export async function searchLog(req, res) {
    try {
        const id = req.query.id;
        const logs = await Log.find({ "details.id": id })

        res.status(200).json({ message: "Logs encontrados com sucesso!", logs: logs });
    } catch (error) {
        res.status(400).json({ message: "Erro ao buscar log", error });
    }
}