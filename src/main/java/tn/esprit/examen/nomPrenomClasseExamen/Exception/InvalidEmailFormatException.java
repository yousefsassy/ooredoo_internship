package tn.esprit.examen.nomPrenomClasseExamen.Exception;

public class InvalidEmailFormatException extends RuntimeException {
    public InvalidEmailFormatException(String message) {
        super(message);
    }
}
