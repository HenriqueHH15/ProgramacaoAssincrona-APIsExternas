"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Endereco_1 = require("./Endereco");
const PessoaJuridica_1 = require("./PessoaJuridica");
const RepositorioPessoaJuridica_1 = require("./RepositorioPessoaJuridica");
const dadosCorretos = [
    "15436940000103",
    "33000167000101",
    "13347016000117",
    "33592510000154",
    "16670085000155",
    "84429695000111",
    "33611500000119"
];
const dadosErrados = [
    "1543694000010",
    "330001670001010",
    "12345678900123",
    "3359251000015a",
];
async function consultarCNPJ(cnpj) {
    const url = `https://receitaws.com.br/v1/cnpj/${cnpj}`;
    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    }
    else {
        throw new SyntaxError(`HTTP error! Status: ${response.status}`);
    }
}
async function consultarCEP(cep) {
    const url = `viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    }
    else {
        throw new SyntaxError(`HTTP error! Status: ${response.status}`);
    }
}
//uso do any para resolver erro "não possui retorno do tipo undefined"
async function fazerRequisicoes(dados) {
    var dados = dados;
    const repositorio = new RepositorioPessoaJuridica_1.RepositorioPessoaJuridicas();
    try {
        for (let i = 0; i < dados.length; i++) {
            //setTimeout(async () => {
            const jsonCnpj = await consultarCNPJ(dados[i]);
            await new Promise(resolve => setTimeout(resolve, 21000));
            const cepPonto = jsonCnpj.cep.split(".");
            const cepTracinho = cepPonto[1].split("-");
            const cep = cepPonto[0] + cepTracinho[0] + cepTracinho[1];
            const jsonCep = await consultarCEP(cep);
            const endereco = new Endereco_1.Endereco(cep, jsonCep.logradouro, jsonCep.bairro, jsonCep.estado, jsonCep.ddd);
            const pessoaJuridica = new PessoaJuridica_1.PessoaJuridica(jsonCnpj.cnpj, jsonCnpj.nome, jsonCnpj.email, jsonCnpj.telefone, endereco);
            repositorio.adicionar(pessoaJuridica);
            //}, 21000);
        }
        return repositorio;
    }
    catch (error) {
        if (error instanceof SyntaxError) {
            return error.message;
        }
    }
}
const retorno = fazerRequisicoes(dadosCorretos);
if (retorno instanceof RepositorioPessoaJuridica_1.RepositorioPessoaJuridicas) {
    retorno.listar.forEach(element => {
        console.log(element.toString());
    });
}
else {
    console.log(retorno);
}
//# sourceMappingURL=index.js.map