import { Postagem } from "./postagem";

export class Usuario {
    email: string;
    senha: string;
    nome: string;
    foto_perfil: string;
    logado: boolean;
    postagem: Array<Postagem>;
}