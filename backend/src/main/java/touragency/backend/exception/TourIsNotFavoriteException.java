package touragency.backend.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TourIsNotFavoriteException extends RuntimeException {
    private String tourName;
    private Long userId;

    public TourIsNotFavoriteException(String name, Long id) {
        super(String.format("Tour %s isn't favorite for user with id = %d.", name, id));
        this.tourName = name;
        this.userId = id;
    }
}
