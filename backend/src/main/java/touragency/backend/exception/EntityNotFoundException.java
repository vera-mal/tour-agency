package touragency.backend.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EntityNotFoundException extends RuntimeException {
    private String entityName;
    private Long entityId;

    public EntityNotFoundException(String entityName, Long entityId) {
        super(String.format("%s with id = %d not found.", entityName, entityId));
        this.entityName = entityName;
        this.entityId = entityId;
    }
}