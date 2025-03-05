import mongoose from "mongoose";

export default async function conectarAoBanco(stringConexao) {
    try {
        console.log("Se conectando ao MongoDB...");
        await mongoose.connect(stringConexao);

        console.log("Conectado ao MongoDB com sucesso");
    } catch (erro) {
        console.error("Falha na conexão com o banco!", erro);
        process.exit(1);
    }
}
