import bcrypt from 'bcryptjs';
import User from "../models/Models.js";

export async function createUser(req, res) {
    const { name, email, password } = req.body;

    try {
        const validaEmail = await User.findOne({ email });
        if (validaEmail) {
            return res.status(400).json({ message: "E-mail já cadastrado!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
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

        res.status(200).json({ message: "Usuário logado com sucesso!"});
    } catch (error) {
        res.status(400).json({ message: "Erro ao logar", error});
    }
}