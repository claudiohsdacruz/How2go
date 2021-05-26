package br.edu.ifpb.bruna.claudio.keven.how2go.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

//@JsonIdentityInfo(scope = Usuario.class, generator = ObjectIdGenerators.PropertyGenerator.class, property = "idUsuario") 
@Entity
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;
    private String email;
    private String senha;
    private String nome;
    @Lob
    private String foto;
    
    @JsonIgnore
    @OneToMany (cascade=CascadeType.ALL, orphanRemoval = true, mappedBy = "usuario")
    private List<Postagem> postagens = new ArrayList<>();

    public Usuario() {};
    
    public Long getidUsuario() {
        return this.idUsuario;
    }

    public void setidUsuario(Long id) {
        this.idUsuario= id;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return this.senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getFoto() {
        return this.foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    @JsonIgnore
    public List<Postagem> getPostagens(){
        return this.postagens;
    }

    @JsonProperty
    public void setPostagens(List<Postagem> postagens){
        this.postagens = postagens;
    }

	@Override
	public String toString() {
		return "Usuario [id=" + idUsuario + ", email=" + email + ", senha=" + senha + ", nome=" + nome + ", foto_perfil="
				+ foto + ", postagens=" + postagens + "]";
	}

   
}
