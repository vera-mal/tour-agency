package touragency.backend.exception;

public class TicketsNotAvailableException extends RuntimeException {
    private Integer currentAmount;

    public TicketsNotAvailableException(Integer currentAmount) {
        super(String.format("Билетов недостаточно. Текущее количество = %d", currentAmount));
        this.currentAmount = currentAmount;
    }
}
