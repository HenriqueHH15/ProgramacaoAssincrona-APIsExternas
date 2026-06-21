"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endereco = void 0;
class Endereco {
    _cep;
    _logradouro;
    _bairro;
    _estado;
    _ddd;
    constructor(cep, logradouro, bairro, estado, ddd) {
        this._cep = cep;
        this._logradouro = logradouro;
        this._bairro = bairro;
        this._estado = estado;
        this._ddd = ddd;
    }
    get cep() {
        return this._cep;
    }
    set cep(Novocep) {
        this.cep = Novocep;
    }
    get logradouro() {
        return this._logradouro;
    }
    set logradouro(Novologradouro) {
        this.logradouro = Novologradouro;
    }
    get bairro() {
        return this._bairro;
    }
    set bairro(Novobairro) {
        this.bairro = Novobairro;
    }
    get estado() {
        return this._estado;
    }
    set estado(Novoestado) {
        this.estado = Novoestado;
    }
    get ddd() {
        return this._ddd;
    }
    set ddd(Novoddd) {
        this.ddd = Novoddd;
    }
    toString() {
        return '\n\t"cep" : "' + this._cep + '" ,' +
            '\n\t"logradouro" : "' + this._logradouro + '" ,' +
            '\n\t"bairro" : "' + this._bairro + '" ,' +
            '\n\t"estado" : "' + this._estado + '" ,' +
            '\n\t"ddd" : "' + this._ddd + '"';
    }
}
exports.Endereco = Endereco;
//# sourceMappingURL=Endereco.js.map