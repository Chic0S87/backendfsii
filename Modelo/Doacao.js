import DoacaoBD from "../Persistencia/DoacaoBD.js";

export default class Doacao {
    #codigo;
    #cpfPessoa;    
    #dataDoacao;
    #listaItens;
    #quantidade;

    constructor(codigo, cpfPessoa, dataDoacao, listaItens) {
        this.#codigo = codigo;
        this.#cpfPessoa = cpfPessoa;
        this.#dataDoacao = dataDoacao;
        this.#listaItens = listaItens;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(codigo) {
        this.#codigo = codigo;
    }

    get cpfPessoa() {
        return this.#cpfPessoa;
    }

    set cpfPessoa(newcpfPessoa) {
        this.#cpfPessoa = newcpfPessoa;
    }

    get quantidade() {
        return this.#quantidade;
    }

    set quantidade(newQuantidade) {
        this.#quantidade = newQuantidade;
    }

    get dataDoacao() {
        return this.#dataDoacao;
    }

    set dataDoacao(newDataDoacao) {
        this.#dataDoacao = newDataDoacao;
    }

    get listaItens() {
        return this.#listaItens
    }

    set listaItens(newListaItens) {
        this.#listaItens = newListaItens;
    }

    toJSON() {
        return {
            "codigo": this.#codigo,
            "cpfPessoa": this.#cpfPessoa,
            "dataDoacao": this.#dataDoacao,
            "listaItens": this.#listaItens.map(item => ({
                "produto": item.produto,
                "quantidade": item.quantidade
            }))
        };
    }

    async gravar() {
        const doacaoBD = new DoacaoBD();
        await doacaoBD.gravar(this);
    }

    // async atualizar() {
    //     const doacaoBD = new DoacaoBD();
    //     await doacaoBD.alterar(this);
    // }

    // async remover(id) {
    //     const doacaoBD = new DoacaoBD();
    //     await doacaoBD.excluir(id);
    // }

    async consultar(termo) {
        const doacaoBD = new DoacaoBD();
        const doacoes = await doacaoBD.consultar(termo);
        return doacoes;
    }

    async consultarCodigo(codigo){
           const doacaoBD = new DoacaoBD();
           const doacao = await doacaoBD.consultarCodigo(codigo);
           return doacao;
    }
}







// import DoacaoBD from "../Persistencia/DoacaoBD.js"

// export default class Doacao{
//   #codigo
//   #data
//   #pessoa
//   #produto

//   constructor(codigo, data, pessoa, produto){
//     this.#codigo = codigo;
//     this.#data = data;
//     this.#pessoa = pessoa;
//     this.#produto = produto
//   }
  
//   get codigo(){
//     return this.#codigo
//   }

//   set codigo(novoCodigo){
//     this.#codigo = novoCodigo
//   }

//   get data(){
//     return this.#data
//   }

//   set data(novaData){
//     this.#data = novaData
//   }

//   get pessoa(){
//     return this.#pessoa
//   }

//   set pessoa(novaPessoa){
//     this.#pessoa = novaPessoa
//   }

//   get produto(){
//     return this.#produto
//   }

//   set produto(novoProduto){
//     this.#produto = novoProduto
//   }

//   toJSON(){
//     return{
//     "codigo":this.#codigo,
//     "data":this.#data,
//     "pessoa":this.#pessoa,
//     "produto":this.#produto
//     }
//   }

//   async gravar(){
//     const doacaoBD = new DoacaoBD();
//     await doacaoBD.gravar(this);
//   }

//   async consultar(){
//     const doacaoBD = new DoacaoBD();
//     const doacao = await doacaoBD.consultar(this);
//     return doacao;
//   }

//   async consultarCodigo(codigo){
//     const doacaoBD = new DoacaoBD();
//     const doacao = await doacaoBD.consultarCodigo(codigo);
//     return doacao;
    
//   }

// }