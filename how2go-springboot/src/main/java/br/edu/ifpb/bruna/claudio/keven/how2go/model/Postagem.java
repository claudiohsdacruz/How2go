package br.edu.ifpb.bruna.claudio.keven.how2go.model;

import java.util.Arrays;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;


// @JsonIdentityInfo(scope = Postagem.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "idPostagem")
@Entity
public class Postagem {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long idPostagem;
   private String titulo;
   private String destino;
   private String descricao;
   private String locais;
   private String[] fotos;
   private String[] comentarios;
	
   @ManyToOne
   @JoinColumn(name="usuario_id")
   private Usuario usuario;

   public Postagem() {};
   
	public Usuario getUsuario() {
		return this.usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

   	public Long getIdPostagem() {
		return idPostagem;
	}
	public void setIdPostagem(Long id) {
		this.idPostagem = id;
	}

	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getDestino() {
		return destino;
	}
	public void setDestino(String destino) {
		this.destino = destino;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public String getLocais() {
		return locais;
	}
	public void setLocais(String locais) {
		this.locais = locais;
	}
	public String[] getFotos() {
		return fotos;
	}
	public void setFotos(String[] fotos) {
		this.fotos = fotos;
	}
	public String[] getComentarios() {
		return comentarios;
	}
	public void setComentarios(String[] comentarios) {
		this.comentarios = comentarios;
	}

	@Override
	public String toString() {
		return "Postagem [id=" + idPostagem + ", titulo=" + titulo + ", destino=" + destino + ", descricao=" + descricao
				+ ", locais_a_visitar=" + locais + ", fotos=" + Arrays.toString(fotos) + ", comentarios="
				+ Arrays.toString(comentarios) + ", usuario=" + usuario + "]";
	}


}