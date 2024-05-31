package com.tldesafio.biblioteca.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tldesafio.biblioteca.dto.LivroDto;
import com.tldesafio.biblioteca.entities.Livro;
import com.tldesafio.biblioteca.entities.PerfilUsuario;
import com.tldesafio.biblioteca.entities.Usuario;
import com.tldesafio.biblioteca.exceptions.OperacaoNaoPermitidaException;
import com.tldesafio.biblioteca.exceptions.RecursoNaoEncontradoException;
import com.tldesafio.biblioteca.repositories.LivroRepository;
import com.tldesafio.biblioteca.repositories.UsuarioRepository;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class LivroService {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private LivroRepository livroRepository;

	@Autowired
	private HttpServletRequest request;

	public Livro findById(Integer id) {
		return this.livroRepository
				.findById(id)
				.orElseThrow(() -> new RecursoNaoEncontradoException("Livro não encontrado"));
	}

	public void create(LivroDto dto) {
		Livro livro = new Livro();
		livro.setNome(dto.getNome());
		livro.setAuthor(dto.getAuthor());
		Usuario usuario = this.usuarioRepository.findById(getUsuarioId()).get();
		livro.setUsuario(usuario);
		this.livroRepository.save(livro);
	}

	public List<Livro> findAll() {
		return this.livroRepository.findAll();
	}

	public void update(Livro livro) {
		
		Livro livroFromDb = findById(livro.getId());
		Usuario usuario = usuarioRepository.findById(getUsuarioId())
				.orElseThrow(() -> new RecursoNaoEncontradoException("Usuario não encontrado"));
		
		this.verificarUsuario(usuario, livroFromDb);
		
		livroFromDb.setAuthor(livro.getAuthor());
		livroFromDb.setNome(livro.getNome());
		livroFromDb.setId(livro.getId());
		
		this.livroRepository.save(livroFromDb);
	}

	public void delete(Integer id) {
		Usuario user = this.usuarioRepository
				.findById(getUsuarioId())
				.orElseThrow(() -> new RecursoNaoEncontradoException("Usuario não encontrado"));
		Livro livro = this.findById(id);
		
		this.verificarUsuario(user, livro);
		
		this.livroRepository.deleteById(id);
	}
	
	public void verificarUsuario(Usuario usuario, Livro livro) {
		if(PerfilUsuario.ADMINISTRADOR != usuario.getPerfilUsuario() && livro.getUsuario().getId() != getUsuarioId()) {
			throw new RuntimeException("Operação não permitida");
		}
	}
	private Integer getUsuarioId() {
		Integer usuarioId = Integer.parseInt(this.request.getHeader("usuarioId"));
		return usuarioId;
	}
	
	
}
