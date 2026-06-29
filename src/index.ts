import { Endereco } from "./Endereco";
import { PessoaJuridica } from "./PessoaJuridica";
import { RepositorioPessoaJuridicas } from "./RepositorioPessoaJuridica";

const dadosCorretos: Array<string> = [
    "15436940000103",
    //"15436940000103",
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
    "16.670.085/0001-55"
];

async function consultarCNPJ(cnpj: string): Promise<JSON> {
    console.log("Consultando CNPJ: " + cnpj);
    const url = `https://receitaws.com.br/v1/cnpj/${cnpj}`;
    const response: Response = await fetch(url);

    if (response.ok) {
        return response.json();
    } else {
        throw new Error("" + response.status);
    }
}

async function consultarCEP(cep: string): Promise<JSON> {
    console.log("Consultando CEP: " + cep)
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response: Response = await fetch(url);

    if (response.ok) {
        return response.json();
    } else {
        throw new Error("" + response.status);
    }
}

function delay(ms: number) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

async function fazerRequisicoes(dados: Array<string>): Promise<Array<PessoaJuridica>> {
    //var dados: Array<string> = dados;
    const repositorio = new RepositorioPessoaJuridicas();

    let i = 0;
    while(i < dados.length){
        try {
            //setTimeout(async () => {
            const jsonCnpj: JSON | any = await consultarCNPJ(dados[i]);

            //await new Promise(resolve => setTimeout(resolve, 21000));

            //retira os pontos e traços do cep e coloca string vazia no lugar
            const cep = jsonCnpj.cep.replace(/\D/g, "");

            /*const cepPonto: Array<string> = jsonCnpj.cep.split(".");
            const cepTracinho: Array<string> = cepPonto[1].split("-");
            const cep: string = cepPonto[0] + cepTracinho[0] + cepTracinho[1];*/

            //para dar erro no cep com formato inválido
            //const cep = jsonCnpj.cep;
            //para dar o erro que o cep não existe
            //const cep = "12345678";

            const jsonCep: JSON | any = await consultarCEP(cep);

            if ("erro" in jsonCep) {  //response.json.erro){
                
                throw new Error("O CEP não existe!");
            } else {

                const endereco: Endereco = new Endereco(cep, jsonCep.logradouro, jsonCep.bairro, jsonCep.estado, jsonCep.ddd);
                console.log("Endereço criado: " + endereco.toString());

                const pessoaJuridica: PessoaJuridica = new PessoaJuridica(jsonCnpj.cnpj, jsonCnpj.nome, jsonCnpj.email, jsonCnpj.telefone, endereco);
                console.log("Empresa criada: " + pessoaJuridica.razaoSocial);

                const adicionou = repositorio.adicionar(pessoaJuridica);
                if(adicionou){
                    i++;
                    console.log("Empresa adicionada no repositório com sucesso.");

                } else {
                    
                    throw new Error("Empresa já existe no repositório!");
                }
            }
            //}, 21000);
        } catch (error: any) {
           
            if (error.message == "400") {
                console.log("O CNPJ não existe ou o CEP está com formato inválido!");
            } else if (error.message == "404") {
                console.log("O CNPJ está no formato inválido!");
            } else if (error.message == "429"){
                console.log("Número máximo de requisições atingido.")
            } else {
                console.log(error.message);
            }
        }
        console.log(`Aguardando 21 segundos para próxima requisição...\n`);
        await delay(21000);
    }
    console.log("Fim das requisições.");
    return repositorio.listar();
}

async function mostrarResultado(){
    const retorno = await fazerRequisicoes(dadosCorretos);
    console.log(`========== LISTANDO EMPRESAS ==========\n`)
    retorno.forEach(element => {
        console.log(element.toString());
    })
}

mostrarResultado();