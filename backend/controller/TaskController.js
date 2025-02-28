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