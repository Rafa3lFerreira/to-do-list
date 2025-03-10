import mongoose from 'mongoose';
import dotenv from 'dotenv';
import conectarAoBanco from "../config/db.js";

dotenv.config();

await conectarAoBanco(process.env.STRING_CON);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: { 
        type: String, 
        enum: ["admin", "user"], 
        default: "user" 
    }
});

const User = mongoose.model('User', userSchema);

export default User;
