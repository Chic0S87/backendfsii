import mysql from "mysql2/promise";

export default async function Conect() {
  if (global.conexao) {
    return await global.conexao.getConnection();
  }
  const conexao = mysql.createPool({
    host: "localhost",
    user: "aluno16-pfsii",
    porta: "3306",
    // password: "aluno16-pfsii",
    password: "7PYoJlYzQaFfOIFN1WzQ",
    // user: "root",
    // password : "",    
    database: "backendaluno16",
    waitForConnections : true,
    connectionLimit: 10,
    maxIdle: 10,
    queueLimit: 0,
    enableKeepAlive :true,
    keepAliveInitialDelay: 0,
  });
  global.conexao = conexao;
  return await global.conexao.getConnection();
}
