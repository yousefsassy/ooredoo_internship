package tn.esprit.examen.nomPrenomClasseExamen.Exception;

public class PasswordResetLimitExceededException extends RuntimeException {
    public PasswordResetLimitExceededException(String message) {
        super(message);
    }
}
