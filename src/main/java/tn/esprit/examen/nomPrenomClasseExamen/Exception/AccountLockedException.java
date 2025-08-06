package tn.esprit.examen.nomPrenomClasseExamen.Exception;

public class AccountLockedException extends RuntimeException {
    public AccountLockedException(String message) {
        super(message);
    }
}
