import { Endereco } from "./Endereco";

export class PessoaJuridica{
    private _cnpj: string;
    private _razaoSocial: string;
    private _email: string;
    private _telefone: string;
    private _endereco: Endereco;

    constructor(cnpj: string, razaoSocial: string, email: string, telefone: string, endereco: Endereco){
        this._cnpj = cnpj;
        this._razaoSocial = razaoSocial;
        this._email = email;
        this._telefone = telefone;
        this._endereco = endereco;
    }

    public get cnpj(): string{
        return this._cnpj;
    }

    public get razaoSocial(): string{
        return this._razaoSocial;
    }

    public set razaoSocial(novaRazaoSocial: string){
        this._razaoSocial = novaRazaoSocial;
    }

    public get email(): string{
        return this._email;
    }

    public set email(novoEmail: string){
        this._email = novoEmail;
    }

    public get telefone(): string{
        return this._telefone;
    }

    public set telefone(novoTelefone: string){
            this._telefone = novoTelefone;
    }

    public get endereco(): string{
        return this._endereco;
    }

    public set endereco(novoEndereco: Endereco){
        if(novoEndereco instanceof Endereco){
            this._endereco = novoEndereco;
        } else {
            throw new TypeError("Novo endereço não é instância da classe Endereco!");
        }
    }

    public toString(): string {
        return "\n\tRazão Social: " + this._razaoSocial +
               "\n\tCNPJ: " + this._cnpj +
               "\n\tEmail: " + this._email +
               "\n\tTelefone: " + this._telefone +
               "\n\tEndereço: " + this._endereco.toString();
    }
}