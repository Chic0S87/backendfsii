import Pessoas from "../Modelo/Pessoas.js";
import Doacao from "../Modelo/Doacao.js";
import Produto from "../Modelo/ProdutoPid.js";
import ItemDoado from "../Modelo/ProdutoDoado.js";

export default class DoacaoCTRL {
  gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const dataDoacao = dados.dataDoacao;
      const pessoa = new Pessoas(dados.pessoa.cpf);
      const itens = dados.itens;
      let listaItens = [];
      for (const item of itens) {
        const produto = new Produto(item.codigo);
        const itemDoado = new ItemDoado(produto, item.produto);
        listaItens.push(itemDoado);
      }
      const doacao = new Doacao(0, dataDoacao, pessoa, listaItens);
      doacao
        .gravar()
        .then(() => {
          resposta.json({
            status: true,
            mensagem: "Doacao gravada com sucesso",
          });
        })
        .catch((e) => {
          resposta.json({
            status: false,
            mensagem: "Não foi possível gravar a doação	" + e.message,
          });
        });
    } else {
      resposta.json({
        status: false,
        mensagem: "Requisição inválida",
      });
    }
  }

  consultar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "GET" && requisicao.is("application/json")) {
      const codigo = requisicao.params.codigo;
      let doacao = new Doacao();
      if (codigo) {
        doacao
          .consultarCodigo(codigo)
          .then((doacao) => {
            resposta.json(doacao);
          })
          .catch((e) => {
            resposta.json({
              status: false,
              mensagem:
                "Não foi possível retornar a lista de doações" + e.message,
            });
          });
      } else {
        doacao.consultar().then((doacoes) => {
          resposta.json(doacoes);
        });
      }
    } else {
      resposta.json({
        status: false,
        mensagem: "Requisição inválida",
      });
    }
  }
}
