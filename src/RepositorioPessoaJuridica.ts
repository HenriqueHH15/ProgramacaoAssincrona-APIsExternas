import {PessoaJuridica} from "./PessoaJuridica";

export class RepositorioPessoaJuridicas{
    private _listaPessoaJuridicas: Array<PessoaJuridica>;

    constructor() {
        this._listaPessoaJuridicas = [];
    }

    adicionar(empresa: PessoaJuridica): boolean{
        const existe = this._listaPessoaJuridicas.some((e) => e.cnpj === empresa.cnpj);
        if (existe) {
            return false;
        }
        this._listaPessoaJuridicas.push(empresa);
        return true;
    }

    listar(): Array<PessoaJuridica>{
        return this._listaPessoaJuridicas.slice();
    }
}