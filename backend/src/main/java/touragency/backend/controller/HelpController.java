package touragency.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import touragency.backend.dto.Help;
import touragency.backend.service.HelpService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bellissimo")
public class HelpController {
    private final HelpService helpService;

    @GetMapping("/help")
    public Help getHelp() {
        return helpService.getAllHelps();
    }
}
