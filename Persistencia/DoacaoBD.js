import Doacao from "../Modelo/Doacao.js";
import conectar from "./Conexao.js";

export default class DoacaoBD{
  async gravar(doacao){
    if (doacao instanceof Doacao){
      const conexao = await conectar();
      await conexao.beginTransaction();
      const sql = "INSERT INTO doacao(dataDoacao, cpfPessoa) VALUES(?,?)"
      const valores = [doacao.data, doacao.pessoa.cpf];
      const resultado = await conexao.query(sql, valores);
      doacao.codigo = resultado[0].insertId;
      for(const item of doacao.produto){
        const sql2 = "INSERT INTO doacao_produto(codigoProduto, codigoDoacao) VALUES (?,?)"
        const parametros = [item.produto.codigo, item.doacao.codigo];
        await conexao.query(sql2, parametros);
      }
      await conexao.commit();
      conexao.release()
    }
  }

  async consultar(){
    const listaDoacoes = [];
    const conexao = await conectar();
    const sql = "SELECT * FROM doacao as d inner join\
                               pessoa as p inner join\
                               produto as pr inner join\
                               produto_doado as i \
                               on d.codigo = i.codigoDoacao\
                               and pr.codigo = i.codigoProduto\
                               and p.cpf = d.cpfPessoa\
                               order by d.dataDoacao"
    
    return listaDoacoes;
  }
}

// 2:06:43