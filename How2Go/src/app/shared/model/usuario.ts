import { Postagem } from "./postagem";

export class Usuario {
    id: number;
    email: string;
    senha: string;
    nome: string;
    foto: string;
    postagens: Array<Postagem>;
}