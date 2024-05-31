package com.tldesafio.biblioteca.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(schema = "biblioteca", name = "livro")
public class Livro {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String nome;
	private LocalDateTime createdAt;

	private String author;

	@ManyToOne
	private Usuario usuario;

	@PrePersist
	private void creationDate() {
		this.createdAt = LocalDateTime.now();
	}

}
