package com.tldesafio.biblioteca.exceptions;

public class RecursoNaoEncontradoException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public RecursoNaoEncontradoException() {
		super();
	}

	public RecursoNaoEncontradoException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public RecursoNaoEncontradoException(String message, Throwable cause) {
		super(message, cause);
	}

	public RecursoNaoEncontradoException(String message) {
		super(message);
	}

	public RecursoNaoEncontradoException(Throwable cause) {
		super(cause);
	}

}
