package com.tldesafio.biblioteca.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tldesafio.biblioteca.entities.Livro;

public interface LivroRepository extends JpaRepository<Livro, Integer> {

}
