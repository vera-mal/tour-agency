package touragency.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

@org.springframework.web.bind.annotation.ControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Response> handleEntityNotFoundException(EntityNotFoundException e) {
        return new ResponseEntity<>(new Response(e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(TourIsNotFavoriteException.class)
    public ResponseEntity<Response> handleTourIsNotFoundException(TourIsNotFavoriteException e) {
        return new ResponseEntity<>(new Response(e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Response> handleAnyException(Exception e) {
        return new ResponseEntity<>(new Response("Something went wrong"), HttpStatus.BAD_REQUEST);
    }
}