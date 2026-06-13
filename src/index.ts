import { Endereco } from "./Endereco";
import { PessoaJuridica } from "./PessoaJuridica";
import { RepositorioPessoaJuridicas } from "./RepositorioPessoaJuridica";

const dados: Array<string> = [
    "15436940000103",
    "33000167000101",
    "13347016000117",
    "33592510000154",
    "16670085000155",
    "84429695000111",
    "33611500000119"
];

async function consultarCNPJ (cnpj: string) : Promise<JSON> {
    const url = `https://receitaws.com.br/v1/cnpj/${cnpj}`;
    const response: Response = await fetch(url);

    if(response.ok){
        return response.json();
    } else {
        throw new SyntaxError(`HTTP error! Status: ${response.status}`);
    }
}

async function consultarCEP (cep: string) : Promise<JSON> {
    const url = `viacep.com.br/ws/${cep}/json/`;
    const response: Response = await fetch(url);

    if(response.ok){
        return response.json();
    } else {
        throw new SyntaxError(`HTTP error! Status: ${response.status}`);
    }
}

async function seiLa (dados: Array<string>) : Array<PessoaJuridica> {
    var dados: Array<string> = dados;

    try {
        for(let i = 0; i < dados.length; i++){
            setTimeout(async () => {
                const jsonCnpj: JSON | any = await consultarCNPJ(dados[i]);

                const cepPonto: Array<string> = jsonCnpj.cep.split(".");
                const cepTracinho: Array<string> = cepPonto[1].split("-");
                const cep: string = cepPonto[0] + cepTracinho[0] + cepTracinho[1];

                const jsonCep: JSON | any = await consultarCEP(cep);
                const endereco: Endereco = new Endereco(cep, jsonCep.logradouro, jsonCep.bairro, jsonCep.estado, jsonCep.ddd);

                const pessoaJuridica: PessoaJuridica = new PessoaJuridica(jsonCnpj.cnpj, jsonCnpj.nome, jsonCnpj.email, jsonCnpj.telefone, endereco);

                
            }, 21000);
        }
    } catch (e) {

    }
}