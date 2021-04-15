import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CriarPostagemComponent } from './criar-postagem/criar-postagem.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ListarPostagemComponent } from './listar-postagem/listar-postagem.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    CriarPostagemComponent,
    ListarPostagemComponent
  ],
  exports: [
    CriarPostagemComponent,
    ListarPostagemComponent
  ],

  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
    MatExpansionModule,
  ]
})
export class PostagemModule { }
