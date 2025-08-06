package tn.esprit.examen.nomPrenomClasseExamen.Exception;

public class TokenExpiredException extends RuntimeException {
    public TokenExpiredException(String message) {
        super(message);
    }
}
