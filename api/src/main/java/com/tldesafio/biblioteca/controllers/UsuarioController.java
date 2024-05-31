package com.tldesafio.biblioteca.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tldesafio.biblioteca.dto.UsuarioDto;
import com.tldesafio.biblioteca.services.UsuarioService;

@CrossOrigin("*")
@RestController
@RequestMapping("usuarios")
public class UsuarioController {

	@Autowired
	private UsuarioService service;
	
	@PostMapping("cadastrar")
	public void create(@RequestBody UsuarioDto dto ) {
		service.save(dto);
	}

	
}
