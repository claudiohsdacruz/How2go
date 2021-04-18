import { Component, OnInit } from '@angular/core';
import {Postagem} from '../../shared/model/postagem';
import { PostagemService } from 'src/app/shared/services/postagem.service';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-criar-postagem',
  templateUrl: './criar-postagem.component.html',
  styleUrls: ['./criar-postagem.component.scss']
})
export class CriarPostagemComponent implements OnInit {
  postagem: Postagem;
  fotos = new Array<string>();
  
  constructor(private postagemService: PostagemService) {
    this.postagem = new Postagem();
    this.postagem.icone='../../assets/postagem/logan.jpg';
   }

  ngOnInit(): void {
  }
   
  inserirPostagem(): void {
    this.postagemService.inserir(this.postagem);
    this.postagem = new Postagem();
    console.log(this.postagem)
  }


  //--------------------------------------------UPLOAD------------------------------------------
  onChange($event:Event){
    const file =($event.target as HTMLInputElement).files[0];
    this.convertToBase64(file)
  }
  convertToBase64(file:File){
    const observable = new Observable((subscriber:Subscriber<any>)=>{
      this.readFile(file,subscriber)
    });
    observable.subscribe((d)=>{
      this.fotos.push(d);
      this.postagem.foto=this.fotos;   
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
