package com.tldesafio.biblioteca.helpers;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Utils {

	public static String toMd5(String content) {
		try {
			MessageDigest m = MessageDigest.getInstance("MD5");
			m.update(content.getBytes(), 0, content.length());
			return new BigInteger(1, m.digest()).toString(16);
		} catch (NoSuchAlgorithmException e) {
			throw new InternalError("Conteudo não processado");
		}

	}

}
