package br.edu.ifpb.bruna.claudio.keven.how2go.service;

import br.edu.ifpb.bruna.claudio.keven.how2go.repositories.UsuarioRepository;
import br.edu.ifpb.bruna.claudio.keven.how2go.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioService {

   @Autowired
   private UsuarioRepository usuarioRepository;

   public List<Usuario> getUsuarios() {
       return this.usuarioRepository.findAll();
   }

   public Usuario getUsuarioPorId(Long idUsuario) {
       return this.usuarioRepository.findById(idUsuario).orElse(null);
   }

   @Transactional
    public Usuario getUsuarioPorEmail(String email) {
        return this.usuarioRepository.findByEmail(email);
        }
    
    public Usuario getUsuarioPorEmailESenha(String email,String senha) {
        return this.usuarioRepository.findByEmailAndSenha(email,senha);
        }

   @Transactional
   public Usuario inserirOuAtualizar(Usuario usuario) {
        Usuario usuarioInserido = this.usuarioRepository.save(usuario);
        return usuarioInserido;
   }

   public void apagar(Long id) {
       this.usuarioRepository.deleteById(id);
   }

}