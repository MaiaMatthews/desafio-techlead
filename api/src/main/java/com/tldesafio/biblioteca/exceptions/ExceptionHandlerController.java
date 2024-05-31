package com.tldesafio.biblioteca.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import lombok.Data;

@ControllerAdvice
public class ExceptionHandlerController {

	@ExceptionHandler(OperacaoNaoPermitidaException.class)
	public ResponseEntity<ErroBody> operacaNaoPermitida(OperacaoNaoPermitidaException exception, WebRequest request){
		
		ErroBody body = new ErroBody();
		
		body.setTimestamp(LocalDateTime.now());
		body.setError(HttpStatus.UNAUTHORIZED.toString());
		body.setMessage(exception.getMessage());
		body.setStatus(HttpStatus.UNAUTHORIZED.value());
		
		return ResponseEntity.ofNullable(body);
		
	}
	
	@ExceptionHandler(RecursoNaoEncontradoException.class)
	public ResponseEntity<ErroBody> operacaNaoPermitida(RecursoNaoEncontradoException exception, WebRequest request){
		
		ErroBody body = new ErroBody();
		
		body.setTimestamp(LocalDateTime.now());
		body.setError(HttpStatus.NOT_FOUND.toString());
		body.setMessage(exception.getMessage());
		body.setStatus(HttpStatus.NOT_FOUND.value());
		
		return ResponseEntity.ofNullable(body);
		
	}
	
}

@Data
class ErroBody {
    private LocalDateTime timestamp;
    private Integer status;
    private String error;
    private String message;
}