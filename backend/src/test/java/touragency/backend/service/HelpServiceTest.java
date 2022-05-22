package touragency.backend.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import touragency.backend.dto.Help;
import touragency.backend.dto.Pair;

import java.util.ArrayList;
import java.util.List;

public class HelpServiceTest {
    private HelpServiceImpl helpService;
    private List<Pair> helps;

    @BeforeEach
    public void init() {
        helpService = new HelpServiceImpl();
        helps = new ArrayList<>();
        helps.add(new Pair("Оплата экскурсии", "На нашем сайте вы можете забронировать место и узнать цену экскурсии. Оплатить вы " +
                "сможете непосредственно в день проведения экскурсии при встрече с вашим гидом."));
        helps.add(new Pair("Скидки", "Вы можете приобрести билеты со скидкой для детей или для пенсионеров. Просто выберете при " +
                "заказе на сайте нужную категорию. Для подтверждения оплаты необходимо будет предоставить свидетельство " +
                "о рождении ребенка. Пенсионерам нужно будет предоставить пенсионное удостоверение."));
        helps.add(new Pair("История заказов", "В данном разделе отображается информация о всех ваших экскурсиях. Вы можете " +
                "посмотреть на каких экскурсиях вы уже побывали, и на какие экскурсии вы собираетесь пойти."));
        helps.add(new Pair("Избранное", "В данном разделе отображается информация об избранных экскурсиях. Чтобы добавить " +
                "экскурсию в избранное, нажмите на кнопку с иконкой «сердечко» в правом верхнем углу на странице" +
                " с описанием экскурсии."));
        helps.add(new Pair("Корзина", "В данном разделе отображается информация об экскурсиях, которые вы выбрали для оплаты." +
                " Подтвердите ваш заказ, и мы уже ждём вас на данной экскурсии."));
    }

    @Test
    public void testGetAllHelps() {
        Help help = helpService.getAllHelps();
        Assertions.assertEquals(helps.get(0), help.getHelp().get(0));
        Assertions.assertEquals(helps.get(1), help.getHelp().get(1));
        Assertions.assertEquals(helps.get(2), help.getHelp().get(2));
        Assertions.assertEquals(helps.get(3), help.getHelp().get(3));
        Assertions.assertEquals(helps.get(4), help.getHelp().get(4));
    }
}
