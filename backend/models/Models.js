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
    },
    img: {
        type: String,
        required: false
    }
});

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    tasks: [],
    created_by: {
        type: String,
    }
});

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'COMPLETED'],
        default: 'PENDING'
    },
    created_by: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const logSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true,
        enum: ['INFO', 'WARN', 'ERROR']
    },
    details: {
        type: Map,
        of: mongoose.Schema.Types.Mixed, 
        default: {}
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

const List = mongoose.model('List', listSchema);

const Task = mongoose.model('Task', taskSchema);

const Log = mongoose.model('Log', logSchema);

export default { User, List, Task, Log };
