import { Usuario } from "./usuario";

export class Postagem {
    id: number;
    usuario: Usuario;
    titulo: string;
    destino: string;
    locais: string;
    descricao: string;
    fotos: Array<string>;
    comentarios : Array<string>;
    like: number = 0;
}