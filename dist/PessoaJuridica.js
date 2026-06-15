"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaJuridica = void 0;
const Endereco_1 = require("./Endereco");
class PessoaJuridica {
    _cnpj;
    _razaoSocial;
    _email;
    _telefone;
    _endereco;
    constructor(cnpj, razaoSocial, email, telefone, endereco) {
        this._cnpj = cnpj;
        this._razaoSocial = razaoSocial;
        this._email = email;
        this._telefone = telefone;
        this._endereco = endereco;
    }
    get cnpj() {
        return this._cnpj;
    }
    get razaoSocial() {
        return this._razaoSocial;
    }
    set razaoSocial(novaRazaoSocial) {
        this._razaoSocial = novaRazaoSocial;
    }
    get email() {
        return this._email;
    }
    set email(novoEmail) {
        this._email = novoEmail;
    }
    get telefone() {
        return this._telefone;
    }
    set telefone(novoTelefone) {
        this._telefone = novoTelefone;
    }
    get endereco() {
        return this._endereco;
    }
    set endereco(novoEndereco) {
        if (novoEndereco instanceof Endereco_1.Endereco) {
            this._endereco = novoEndereco;
        }
        else {
            throw new TypeError("Novo endereço não é instância da classe Endereco!");
        }
    }
    toString() {
        return "\n\tRazão Social: " + this._razaoSocial +
            "\n\tCNPJ: " + this._cnpj +
            "\n\tEmail: " + this._email +
            "\n\tTelefone: " + this._telefone +
            "\n\tEndereço: " + this._endereco.toString();
    }
}
exports.PessoaJuridica = PessoaJuridica;
//# sourceMappingURL=PessoaJuridica.js.map