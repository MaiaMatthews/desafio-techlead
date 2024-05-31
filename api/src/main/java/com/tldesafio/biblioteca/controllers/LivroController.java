package com.tldesafio.biblioteca.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tldesafio.biblioteca.dto.LivroDto;
import com.tldesafio.biblioteca.entities.Livro;
import com.tldesafio.biblioteca.services.LivroService;

@CrossOrigin("*")
@RestController
@RequestMapping("livros")
public class LivroController {

	@Autowired
	private LivroService livroService;


	@GetMapping
	public List<Livro> getAll() {
		return livroService.findAll();
	}

	@GetMapping("/{id}")
	public Livro findById(@PathVariable Integer id) {
		return livroService.findById(id);
	}

	@PostMapping
	public void create(@RequestBody LivroDto livro) {
		livroService.create(livro);
	}

	@PutMapping
	public void update(@RequestBody Livro livro) {
		livroService.update(livro);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Integer id) {
		livroService.delete(id);
	}

}
