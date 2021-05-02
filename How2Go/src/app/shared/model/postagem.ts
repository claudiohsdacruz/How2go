import { Usuario } from "./usuario";

export class Postagem {
    id?: string;
    usuario: string;
    titulo: string;
    destino: string;
    locais_a_visitar: string;
    descricao: string;
    icone: string;
    foto: Array<string>;
    comentarios : Array<{}>;
    like: number = 0;
}