import express from "express";
import routerPessoa from "./Router/RouterPessoas.js";
import routerCidade from "./Router/RouterCidades.js";
import cors from "cors";

const server = express();
server.use(cors({ origin: "*" }));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use("/pessoas", routerPessoa);
server.use("/cidades", routerCidade);
server.listen(3308, "localhost", () => {
  console.log("Service running on http://localhost:3308 ");
});
 