import Cidade from "../Modelo/Cidades.js";
import Conect from "./Conexao.js";

export default class CidadeBD {
  async gravar(cidade) {
    if (cidade instanceof Cidade) {
      const conect = await Conect();
      const sql = "INSERT INTO cidades(nome) VALUES (?) ";
      const values = [cidade.nome];
      const resultado = await conect.query(sql, values);
      conexao.release()
      return await resultado[0].insertId;
    }
  }

  async atualizar(cidade) {
    if (cidade instanceof Cidade) {
      const conect = await Conect();
      const sql = "UPDATE cidades SET nome=? WHERE codigo=?";
      const values = [cidade.nome, cidade.codigo];
      await conect.query(sql, values);
      conexao.release()
    }
  }

  async excluir(cidade) {
    if (cidade instanceof Cidade) {
      const conect = await Conect();
      const sql = "DELETE FROM cidades WHERE codigo=?";
      const values = [cidade.codigo];
      await conect.query(sql, values);
      conexao.release()
    }
  }

  async consultar(term) {
    const conect = await Conect();
    const sql = "SELECT * FROM cidades";
    const values = ["%" + term + "%"];
    const [rows] = await conect.query(sql, values);
    const listCidades = [];
    for (const row of rows) {
      const cidade = new Cidade(row["codigo"], row["nome"]);
      listCidades.push(cidade);
    }
    conexao.release()
    return listCidades;
  }
}
