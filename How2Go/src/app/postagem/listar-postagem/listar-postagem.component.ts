import { Component, OnInit } from '@angular/core';
import { POSTAGENS } from 'src/app/shared/model/POSTAGENS';

@Component({
  selector: 'app-listar-postagem',
  templateUrl: './listar-postagem.component.html',
  styleUrls: ['./listar-postagem.component.scss']
})
export class ListarPostagemComponent implements OnInit {

  // postagens = [
  //   {titulo: 'Usuario 1', destino: '123', locais_a_visitar: '40', descricao: 'aaaaaaaaaaa'},
  // ];

  postagens = POSTAGENS;

  constructor() { }

  ngOnInit(): void {
  }

}
