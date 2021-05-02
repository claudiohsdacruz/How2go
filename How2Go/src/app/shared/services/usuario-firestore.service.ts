import { Injectable } from '@angular/core';
import {from, Observable, Subscriber} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { usuarioLogado } from '../model/usuario_logado';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  colecaoUsuarios: AngularFirestoreCollection<Usuario>;
  NOME_COLECAO = 'usuarios';
  usuario_logado= usuarioLogado;
  usuario = new Usuario();
  foto: Observable<any>;

  constructor(private afs: AngularFirestore) {
    this.colecaoUsuarios = afs.collection(this.NOME_COLECAO);
  }

  buscar(email: string): Observable<Usuario[]> {
    let pesquisa:AngularFirestoreCollection<Usuario>;

    pesquisa = this.afs.collection(this.NOME_COLECAO, ref=>ref.where('email','==',email));
    if(pesquisa==null) {
      return null
    }

    return pesquisa.valueChanges();
 }

  cadastrar(usuario: Usuario): Observable<object> {
    delete usuario.id;
    
    if(usuario.foto_perfil==undefined) {
      usuario.foto_perfil = '../../../assets/usuario/default.png';
    }

    this.usuario_logado.shift();
    this.usuario_logado.push(usuario);
    
    return from(this.colecaoUsuarios.add(Object.assign({}, usuario)));
  }


  // sair(usuario: Usuario): Observable<object> {
    
  // }

   //-----------------------------------UPLOAD FOTOS-----------------------------------
  
  uploadFoto($event:Event): Observable<any> {
    const file =($event.target as HTMLInputElement).files[0];  
    this.convertToBase64(file);
    return this.foto;
  }
  convertToBase64(file:File){
    this.foto = new Observable ((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber)
    });
  }
  readFile(file:File, subscriber:Subscriber<any>){
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload=()=>{
      subscriber.next(filereader.result);
      subscriber.complete();
    }
    filereader.onerror=(error)=>{
      subscriber.error(error);
      subscriber.complete();
    }
  }
}
