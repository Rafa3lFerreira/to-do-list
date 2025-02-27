import { MongoClient } from "mongodb";

export default async function conectarAoBanco(stringConexao){
    let mongoClient;

    try{
        mongoClient = new MongoClient(stringConexao);
        console.log("Se conectando ao cluster");
        await mongoClient.connect();
        console.log("Conectado ao MongoDB com sucesso");

        return mongoClient;
    } catch (erro) {
        console.log("Falha na conexão com o banco!". erro);
        process.exit();
    }
}