import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, List } from "../models/Models.js";

export async function createUser(req, res) {
    const { name, email, password, role } = req.body;

    try {
        const validaEmail = await User.findOne({ email });
        if (validaEmail) {
            return res.status(400).json({ message: "E-mail já cadastrado!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword, role: role || "user" });
        await newUser.save();

        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        res.status(400).json({ message: "Erro ao cadastrar usuário", error });
    }
}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const validateEmail = await User.findOne ({ email });
        const validatePassword = await bcrypt.compare(password, validateEmail.password);

        if(!validateEmail || !validatePassword) {
            return res.status(400).json({ message: "E-mail ou senha incorretos!"});
        }

        const token = jwt.sign(
            { id: validateEmail._id, name: validateEmail.name, role: validateEmail.role },
            process.env.JWT_SECRET, // Definido isso no .env
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Usuário logado com sucesso!",
            token,
            name: validateEmail.name,
            role: validateEmail.role
        });
    } catch (error) {
        res.status(400).json({ message: "Erro ao logar", error});
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

export async function createList(req, res) {
    const { title, description } = req.body;
    try {
        const newList = new List ({ title, description });
        await newList.save();

        res.status(201).json({ message: "Lista cadastrada com sucesso!" });
    } catch (error) {
        
    }
}