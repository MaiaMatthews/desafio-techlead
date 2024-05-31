package com.tldesafio.biblioteca.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tldesafio.biblioteca.dto.UsuarioDto;
import com.tldesafio.biblioteca.entities.PerfilUsuario;
import com.tldesafio.biblioteca.entities.Usuario;
import com.tldesafio.biblioteca.helpers.Utils;
import com.tldesafio.biblioteca.repositories.UsuarioRepository;

@Service
public class UsuarioService {
	@Autowired
	private UsuarioRepository usuarioRepository;

	public Usuario findById(Integer id) {
		return this.usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario não encontrado"));
	}

	public void save(UsuarioDto dto) {
		
		String nome = dto.getNome().toLowerCase();
		
		Usuario u = this.usuarioRepository.findByNome(nome);
		
		if(u != null) {
			throw new RuntimeException("Usuário já existe, tente outro username");
		}
		
		Usuario usuario = new Usuario();
		usuario.setNome(nome);
		usuario.setSenha(Utils.toMd5(dto.getSenha()));
		usuario.setPerfilUsuario(PerfilUsuario.CLIENTE);
		
		this.usuarioRepository.save(usuario);
	}

}
