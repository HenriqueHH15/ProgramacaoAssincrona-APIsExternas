export class Endereco {
    private _cep: string;
    private _logradouro: string;
    private _bairro: string;
    private _estado: string;
    private _ddd: string;


constructor(cep: string, logradouro: string, bairro: string, estado: string, ddd: string){
        this._cep = cep;
        this._logradouro = logradouro;
        this._bairro = bairro;
        this._estado = estado;
        this._ddd = ddd;
}

    public get cep(): string {
        return this._cep;
    }

    public set cep(Novocep: string){
        if(Novocep.length == 8){
        this.cep = Novocep;
    } else {
         throw new RangeError("O cep possui uma quantidade incorreta de caracteres")
    }
    }

    public get logradouro(): string {
        return this._logradouro;
    }
    
    public set logradouro(Novologradouro: string) {
        this.logradouro = Novologradouro;
    }

    public get bairro(): string {
        return this._bairro;
    }

    public set bairro(Novobairro: string) {
        this.bairro = Novobairro;
    }

    public get estado(): string {
        return this._estado;
    }

    public set estado(Novoestado: string) {
        this.estado = Novoestado;
    }

    public get ddd(): string {
        return this._ddd;
    }
    
    public set ddd(Novoddd: string) {
        if(Novoddd.length == 2){
        this.ddd = Novoddd;
    } else {
        throw new RangeError("O ddd possui uma quantidade incorreta de caracteres")

    }
    } 

    public toString(): string{
     return '\n\t"cep" : "' + this._cep + '" ,' +
            '\n\t"logradouro" : "' + this._logradouro + '" ,' +
            '\n\t"bairro" : "' + this._bairro + '" ,' +
            '\n\t"estado" : "' + this._estado + '" ,' +
            '\n\t"ddd" : "' + this._ddd + '"';
}
}



        