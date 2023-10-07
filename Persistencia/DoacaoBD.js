import Doacao from "../Modelo/Doacao.js";
import conectar from "./Conexao.js";
import ItemDoado from "../Modelo/ProdutoDoado.js";
import Produto from "../Modelo/ProdutoPid.js";
import CategoriaProd from "../Modelo/CategoriaProd.js";
import Pessoas from "../Modelo/Pessoas.js";

export default class DoacaoBD{
  async gravar(doacao){
    if (doacao instanceof Doacao){
      const conexao = await conectar();
      try{
      
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
      }catch(e){
        await conexao.rollback();
        throw e;
      }
      await conexao.commit();
      global.conexao.release()
    }
  }

  async consultar(){
    let listaDoacoes = [];
    const conexao = await conectar();
    const sql = "SELECT * FROM doacao as d inner join pessoas as p \
                                on p.cpf = d.cpfPessoa\
                                order by d.dataDoacao"
    const [doacoes] = await conexao.query(sql);
    for(const rows of doacoes){
        const pessoa = new Pessoas(rows["cpf"], rows["nome"], rows["nascimento"], rows["endereco"], rows["cidade"], rows["telefone"], rows["tipo"], rows["profissao1"], rows["email"]);
        let doacao = new Doacao(rows["codigo"], rows["dataDoacao"], pessoa, rows["codigoProduto"],[]);
    
    const sqlitens = "SELECT * FROM produto as pr inner join doacao_produto as i\
                                                  inner join categoria_produto as c\
                                                  on pr.codigo = i.codigoProduto\
                                                  and c.codigo = pr.codigo\
                                                  WHERE i.codigoDoacao = ?"       
    const parametros=[doacao.codigo];
    const [itensDoacao] = await conexao.query(sqlitens, parametros);
    let listaItens = [];  
    for(const item of itensDoacao){
      const categoria= new CategoriaProd(item["codigo"], item["categoria"]);
      const produto = new Produto(item["codigo"], item["nome"], item["metrica"], item["descricao"], item["codigoCategoria"], item["categoria"],categoria);
      listaItens.push(new ItemDoado(produto, item["produto"]))
    }
    doacao.listaItens = listaItens;
    listaDoacoes.push(doacao);
    }
    return listaDoacoes;
  }

  async consultarCodigo(codigo){
    let listaDoacoes = [];
    const conexao = await conectar();
    const sql = "SELECT * FROM doacao as d inner join pessoas as p \
                                on p.cpf = d.cpfPessoa\
                                WHERE d.codigo = ?\
                                order by d.dataDoacao"
    const parametros = [codigo];
    const [doacoes] = await conexao.query(sql, parametros);
    for(const rows of doacoes){
        const pessoa = new Pessoas(rows["cpf"], rows["nome"], rows["nascimento"], rows["endereco"], rows["cidade"], rows["telefone"], rows["tipo"], rows["profissao1"], rows["email"]);
        const doacao = new Doacao(rows["codigo"], rows["dataDoacao"], pessoa, rows["codigoProduto"],[]);
    
    const sqlitens = "SELECT * FROM produto as pr inner join doacao_produto as i\
                                                  inner join categoria_produto as c\
                                                  on pr.codigo = i.codigoProduto\
                                                  and c.codigo = pr.codigo\
                                                  WHERE i.codigoDoacao = ?"       
    const parametros=[doacao.codigo];
    const [itensDoacao] = await conexao.query(sqlitens, parametros);
    let listaItens = [];  
    for(const item of itensDoacao){
      const categoria= new CategoriaProd(item["codigo"], item["categoria"]);
      const produto = new Produto(item["codigo"], item["nome"], item["metrica"], item["descricao"], item["codigoCategoria"], item["categoria"],categoria);
      listaItens.push(new ItemDoado(produto, item["produto"]))
    }
    doacao.listaItens = listaItens;
    listaDoacoes.push(doacao);
    }
    return listaDoacoes;
  }
}

// 2:06:43