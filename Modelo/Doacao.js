import DoacaoBD from "../Persistencia/DoacaoBD.js"

export default class Doacao{
  #codigo
  #data
  #pessoa
  #produto

  constructor(codigo, data, pessoa, produto){
    this.#codigo = codigo;
    this.#data = data;
    this.#pessoa = pessoa;
    this.#produto = produto
  }
  
  get codigo(){
    return this.#codigo
  }

  set codigo(novoCodigo){
    this.#codigo = novoCodigo
  }

  get data(){
    return this.#data
  }

  set data(novaData){
    this.#data = novaData
  }

  get pessoa(){
    return this.#pessoa
  }

  set pessoa(novaPessoa){
    this.#pessoa = novaPessoa
  }

  get produto(){
    return this.#produto
  }

  set produto(novoProduto){
    this.#produto = novoProduto
  }

  toJSON(){
    return{
    "codigo":this.#codigo,
    "data":this.#data,
    "pessoa":this.#pessoa,
    "produto":this.#produto
    }
  }

  async gravar(){
    const doacaoBD = new DoacaoBD();
    await doacaoBD.gravar(this);
  }

  async consultar(){
    const doacaoBD = new DoacaoBD();
    const doacao = await doacaoBD.consultar(this);
    return doacao;
  }

  async consultarCodigo(codigo){
    const doacaoBD = new DoacaoBD();
    const doacao = await doacaoBD.consultarCodigo(codigo);
    return doacao;
    
  }





}