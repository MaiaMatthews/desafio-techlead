package com.tldesafio.biblioteca.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tldesafio.biblioteca.dto.LoginDto;
import com.tldesafio.biblioteca.entities.Usuario;
import com.tldesafio.biblioteca.helpers.Utils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

@CrossOrigin("*")
@RestController
@RequestMapping("login")
public class LoginController {

	@PersistenceContext
	private EntityManager em;

	@PostMapping
	public Usuario login(@RequestBody LoginDto dto) {
		
		String nome = dto.getNome().toLowerCase();
		
		String jpql = "SELECT obj FROM Usuario obj WHERE obj.nome = :nome AND obj.senha = :senha";

		try {
			Object singleResult = em.createQuery(jpql).setParameter("nome", nome)
					.setParameter("senha", Utils.toMd5(dto.getSenha())).getSingleResult();

			return (Usuario) singleResult;
		}catch (NoResultException e) {
			throw new RuntimeException("Login inválido");
		}
	}

}
