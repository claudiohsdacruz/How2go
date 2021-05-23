import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarPostagemComponent } from './postagem/criar-postagem/criar-postagem.component';
import { ListarPostagemComponent } from './postagem/listar-postagem/listar-postagem.component';
import {CadastrarUsuarioComponent} from './usuario/cadastrar-usuario/cadastrar-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: ListarPostagemComponent
  },
  {
    path: 'listarPostagens',
    component: ListarPostagemComponent
  },
  {
    path: 'criarPostagem',
    component: CriarPostagemComponent
  },
  {
    path: 'cadastrarUsuario',
    component: CadastrarUsuarioComponent
  },
  {
    path: 'listarUsuario',
    component: ListarPostagemComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
