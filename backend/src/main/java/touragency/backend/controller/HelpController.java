package touragency.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import touragency.backend.service.HelpService;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bellissimo")
public class HelpController {
    private final HelpService helpService;

    @GetMapping("/help")
    public Map<String, String> getHelp() {
        return helpService.getAllHelps();
    }
}
