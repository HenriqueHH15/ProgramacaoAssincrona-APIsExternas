"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioPessoaJuridicas = void 0;
class RepositorioPessoaJuridicas {
    _listaPessoaJuridicas;
    constructor() {
        this._listaPessoaJuridicas = [];
    }
    adicionar(empresa) {
        const existe = this._listaPessoaJuridicas.some((e) => e.cnpj === empresa.cnpj);
        if (existe) {
            return false;
        }
        this._listaPessoaJuridicas.push(empresa);
        return true;
    }
    listar() {
        return this._listaPessoaJuridicas;
    }
}
exports.RepositorioPessoaJuridicas = RepositorioPessoaJuridicas;
//# sourceMappingURL=RepositorioPessoaJuridica.js.map