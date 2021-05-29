package br.edu.ifpb.bruna.claudio.keven.how2go.repositories;

import br.edu.ifpb.bruna.claudio.keven.how2go.model.Postagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostagemRepository extends JpaRepository<Postagem, Long> {

   List<Postagem> findByDestino(String destino);
   List<Postagem> findByDestinoAndTitulo(String destino, String titulo);

   @Query("SELECT p FROM Postagem p where p.destino like %:destino%")
   public List<Postagem> getPostagensDestino(String destino);
}