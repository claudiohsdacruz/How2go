import { Injectable } from '@angular/core';
import {from, Observable, Subscriber} from 'rxjs';
import {Postagem} from '../model/postagem';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
 
@Injectable({
 providedIn: 'root'
})
export class PostagemFirestoreService {
 
 colecaoPostagens: AngularFirestoreCollection<Postagem>;
 NOME_COLECAO = 'postagens';
 fotos: Array<string>;
 
 constructor(private afs: AngularFirestore) {
   this.colecaoPostagens = afs.collection(this.NOME_COLECAO);
 }
 
 listar(): Observable<Postagem[]> {
    // usando options para idField para mapear o id gerado pelo firestore para o campo id de usuário
   return this.colecaoPostagens.valueChanges({idField: 'id'});
 }
 
 inserir(postagem: Postagem): Observable<object> {
   // removendo id pois ele está undefined, já que uma nova postagem
   delete postagem.id;
   // Object.assign({}, postagem) é usado para passar um objeto json puro. Não se aceita passar um objeto customizado
   // o from transforma uma promise num Observable, para mantermos a assinatura similar ao do outro service
   if(postagem.foto==undefined) {
     postagem.foto=[]
   }
   postagem.comentarios = [];
   
   return from(this.colecaoPostagens.add(Object.assign({}, postagem)));
 }
 
 remover(id: string): Observable<void> {
   console.log(id);
   return from(this.colecaoPostagens.doc(id).delete());
 }
 
//  pesquisarPorId(id: string): Observable<Postagem> {
//    // como o objeto retornado pelo get é um DocumentData, e não um usuário, transformamos a partir de um pipe e mapeamos de um document
//    //  para o tipo usuário
//    return this.colecaoPostagens.doc(id).get().pipe(map(document => new Postagem(document.id, document.data())));
//  }
 
 atualizar(postagem: Postagem): Observable<void> {
   // removendo id pois não vamos guardar nos dados do documento, mas sim usar apenas como id para recuperar o documento
   delete postagem.id;
   return from(this.colecaoPostagens.doc(postagem.id).update(Object.assign({}, postagem)));
 }

 inserirComentario(postagem:Postagem,comentario:string): Observable<void>{
    postagem.comentarios.push(['Autor 1',comentario]);
    console.log(postagem.comentarios)
    return from(this.colecaoPostagens.doc(postagem.id).update(postagem));
  }

  clickLike(postagem: Postagem): number {
    if(postagem.like==0) {
      postagem.like+=1;
    }
    else{
      postagem.like-=1;
    }
    return postagem.like;
  }
 
//  listarMaioresDeIdade(): Observable<Usuario[]> {
//    let usuariosMaioresIdade: AngularFirestoreCollection<Usuario>;
//    // fazendo pesquisas usando o where. Um where pode ser encadeado com outro
//    usuariosMaioresIdade = this.afs.collection(this.NOME_COLECAO, ref => ref.where('idade', '>', '17'));
//    return usuariosMaioresIdade.valueChanges();
//  }

   //-----------------------------------UPLOAD FOTOS-----------------------------------
   onChange($event:Event):Array<string>{
    this.fotos=[];
    const file =($event.target as HTMLInputElement).files;
    for (let i=0;i<file.length;i++){
      this.convertToBase64(file[i]);
    }
    return this.fotos;
  }
  convertToBase64(file:File){
    const observable = new Observable((subscriber:Subscriber<any>)=>{
      this.readFile(file,subscriber)
    });
    observable.subscribe((d)=>{
      this.fotos.push(d);
    })
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
