import conectarAoBanco from "../config/db.js";

const con = await conectarAoBanco(process.env.STRING_CON);

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const Task = mongoose.model("Task", TaskSchema);

export async function getTasks() {
    const db = con.db("to-do-list");
    const colecao = db.collection("lista-fazer");
    return colecao.find().toArray();
}

export default Task;
