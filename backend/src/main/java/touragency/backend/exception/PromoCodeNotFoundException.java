package touragency.backend.exception;

public class PromoCodeNotFoundException extends RuntimeException {
    private Integer promoCode;

    public PromoCodeNotFoundException(Integer promoCode) {
        super(String.format("Promocode %s not found", promoCode));
        this.promoCode = promoCode;
    }
}
