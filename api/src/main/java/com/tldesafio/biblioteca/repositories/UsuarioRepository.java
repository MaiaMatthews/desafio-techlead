package com.tldesafio.biblioteca.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tldesafio.biblioteca.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

	Usuario findByNome(String nome);
	
}
