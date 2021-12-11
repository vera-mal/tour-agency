package touragency.backend.dto;

import java.util.List;

public class Help {
    private List<Pair> help;

    public Help(List<Pair> help) {
        this.help = help;
    }

    public List<Pair> getHelp() {
        return help;
    }

    public void setHelp(List<Pair> help) {
        this.help = help;
    }
}

