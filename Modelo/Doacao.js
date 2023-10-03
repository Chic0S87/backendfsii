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





}