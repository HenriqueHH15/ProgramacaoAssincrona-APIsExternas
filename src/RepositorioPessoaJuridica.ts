import {PessoasJuridicas} from "./PessoasJuridicas";

export class RepositorioPessoaJuridica{
    private _listaPessoasJuridicas: Array<PessoasJuridicas>;

    constructor() {
        this._listaPessoasJuridicas = [];
    }

    adicionar(empresa: PessoasJuridicas): boolean{
        const existe = this._listaPessoasJuridicas.some((e) => e.cnpj === empresa.cnpj);
        if (existe) {
            return false;
        }
        this._listaPessoasJuridicas.push(empresa);
        return true;
    }

    listar(): Array<PessoasJuridicas>{
        return this._listaPessoasJuridicas;
    }
}