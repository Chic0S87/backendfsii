import express from "express";
import routerPessoa from "./Router/RouterPessoas.js";
import routerCidade from "./Router/RouterCidades.js";
import cors from "cors";

const porta=4016;
const hostname = '0.0.0.0';
const server = express();
server.use(cors({ origin: "*" }));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use("/pessoas", routerPessoa);
server.use("/cidades", routerCidade);
server.listen(porta,hostname, () => {
  console.log("Backend ouvindo em http://"+hostname+":"+porta);
});
 