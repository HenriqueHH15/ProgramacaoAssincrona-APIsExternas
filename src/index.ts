import { Endereco } from "./Endereco";
import { PessoaJuridica } from "./PessoaJuridica";
import { RepositorioPessoaJuridicas } from "./RepositorioPessoaJuridica";

const dadosCorretos: Array<string> = [
    "15436940000103",
    "33000167000101",
    "13347016000117",
    "33592510000154",
    "16670085000155",
    "84429695000111",
    "33611500000119"
];

const dadosErrados: Array<string> = [
    "1543694000010",
    "330001670001010",
    "12345678900123",
    "3359251000015a",
];

async function consultarCNPJ (cnpj: string) : Promise<JSON> {
    const url = `https://receitaws.com.br/v1/cnpj/${cnpj}`;
    const response: Response = await fetch(url);

    if(response.ok){
        return response.json();
    } else {
        throw new Error("" + response.status);
    }
}

async function consultarCEP (cep: string) : Promise<JSON> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response: Response = await fetch(url);

    if(response.ok){
        return response.json();
    } else {
        throw new Error("" + response.status);
    }
}

                                                                                //uso do any para resolver erro "não possui retorno do tipo undefined"
async function fazerRequisicoes (dados: Array<string>) : Promise<RepositorioPessoaJuridicas | any> {
    var dados: Array<string> = dados;
    const repositorio: RepositorioPessoaJuridicas = new RepositorioPessoaJuridicas();

    try {
        for(let i = 0; i < dados.length; i++){
            setTimeout(async () => {
                const jsonCnpj: JSON | any = await consultarCNPJ(dados[i]);

                //await new Promise(resolve => setTimeout(resolve, 21000));
                
                                                //retira os pontos e traços do cep e coloca string vazia no lugar
                //const cep = jsonCnpj.cep.replace(/\D/g, "");
                const cepPonto: Array<string> = jsonCnpj.cep.split(".");
                const cepTracinho: Array<string> = cepPonto[1].split("-");
                const cep: string = cepPonto[0] + cepTracinho[0] + cepTracinho[1];

                const jsonCep: JSON | any = await consultarCEP(cep);

                if("erro" in jsonCep){  //response.json.erro){
                    throw new Error("O CEP não existe!");
                } else {

                const endereco: Endereco = new Endereco(cep, jsonCep.logradouro, jsonCep.bairro, jsonCep.estado, jsonCep.ddd);

                const pessoaJuridica: PessoaJuridica = new PessoaJuridica(jsonCnpj.cnpj, jsonCnpj.nome, jsonCnpj.email, jsonCnpj.telefone, endereco);

                repositorio.adicionar(pessoaJuridica);
                }
            }, 21000);
        }
        return repositorio;
    } catch (error: any) {
        if(error.message == "400"){
            return "O CNPJ não existe ou o CEP está com formato inválido!";
        } else if (error.message == "404"){
            return "O CNPJ está no formato inválido!";
        } else {
            return error.message;
        }
    }

}

const retorno: RepositorioPessoaJuridicas | any = fazerRequisicoes(dadosCorretos);

if (retorno instanceof RepositorioPessoaJuridicas) {
    retorno.listar().forEach(element => {
        console.log(element.toString());
    });
} else {
    console.log(retorno);
}


