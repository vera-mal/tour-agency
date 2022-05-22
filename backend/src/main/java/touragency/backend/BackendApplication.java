package touragency.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import touragency.backend.dto.UserRegistrationDTO;
import touragency.backend.entity.*;
import touragency.backend.repository.*;
import touragency.backend.service.CategoryService;
import touragency.backend.service.UserService;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(CategoryService categoryService, TourRepository tourRepository,
                                  EventRepository eventRepository, CertificateRepository certificateRepository,
                                  UserService userService, DiscountRepository discountRepository,
                                  CertificateItemRepository certificateItemRepository, RoleRepository roleRepository) {
        return new CommandLineRunner() {
            @Override
            public void run(String... args) throws Exception {
                Category category1 = new Category(null, "boat-trips", "Водные прогулки");
                Category category2 = new Category(null, "walking-tours", "Пешие экскурсии");
                Category category3 = new Category(null, "bus-tours", "Автобусные экскурсии");
                Category category4 = new Category(null, "museums", "Музеи и выставки");
                Category category5 = new Category(null, "mystical-tours", "Мистические экскурсии");
                categoryService.saveCategory(category1);
                categoryService.saveCategory(category2);
                categoryService.saveCategory(category3);
                categoryService.saveCategory(category4);
                categoryService.saveCategory(category5);

                Tour[] tours = new Tour[12];
                //categoriesList1, tour1
                ArrayList<Category> categoriesList1 = new ArrayList<>();
                categoriesList1.add(category1);

                tours[0] = new Tour(null, "Экскурсия под Аничковым мостом",
                        "Санкт-Петербург известен большим количеством мостов, " +
                                "соединяющих берега рек и каналов, протекающих по городу." +
                                "Одним из наиболее популярных в городе и всей России" +
                                "считается Аничков мост. Он переброшен через Фонтанку, " +
                                "входит в число трех переправ, пересекающих Невский проспект." +
                                "Общая длина моста — 54,6 м, ширина — 37,9 м." +
                                "Аничков мост имеет три полосы движения, а также пешеходные тротуары." +
                                "Официальное его название «Невский мост» не прижилось. " +
                                "Название «Аничков» пошло от имени подполковника-инженера " +
                                "Михаила Аничкова, рабочий батальон которого отстроил слободу," +
                                "находившуюся неподалеку. Он же принимал  участие в строительстве моста." +
                                "Истории же, возводящие название моста к некоей Аничке или Ане," +
                                " — просто городские легенды.",
                        "https://ic.pics.livejournal.com/la_ra_fa/64614718/181254/181254_900.jpg;" +
                                "https://shareslide.ru/img/thumbs/be426a0d349c804bbbf786402fa8ce26-800x.jpg",
                        new BigDecimal(1000), categoriesList1, null);
                tourRepository.save(tours[0]);

                //categoriesList2, tour2
                ArrayList<Category> categoriesList2 = new ArrayList<>();
                categoriesList2.add(category2);

                tours[1] = new Tour(null, "Ускользающий мир Петербургских дворов и парадных",
                        "Питер полон красоты, она находится не только на площадях" +
                                "и главных улицах города: шедевры архитектуры попросту" +
                                "скрывается от глаз обычных прохожих. Творцы зачастую специально" +
                                "прятали искусство от глаз непосвященных. Я проведу вас" +
                                "в самые красивые дворы и парадные Петербурга. Вы сами посмотрите" +
                                "на те самые дворы-колодцы и парадные доходных домов. Интерьеры прекрасно" +
                                "подойдут для фотографий в соцсети, а вы узнаете уникальные" +
                                "факты о жизни доходных домов на протяжении веков." +
                                "Вы узнаете не только об истории зданий, но и о быте людей, которые жили в них 100 лет назад.",
                        "https://554a875a-71dc-4f5f-b6bf-ae8967f137d5.selcdn.net/thumbs2/78d6134a-b1e0-11e9-af7d-025c4c6e7a28.800x600.jpg;" +
                                "https://554a875a-71dc-4f5f-b6bf-ae8967f137d5.selcdn.net/thumbs2/1530b90a-d136-11e8-a8e8-025c4c6e7a28.800x600.jpg",
                        new BigDecimal(2500), categoriesList2, null);
                tourRepository.save(tours[1]);

                //categoriesList34, tour3
                ArrayList<Category> categoriesList34 = new ArrayList<>();
                categoriesList34.add(category3);
                categoriesList34.add(category4);

                tours[2] = new Tour(null, "Индивидуальная экскурсия в Петергоф",
                        "Если вы отдыхаете в Петербурге, то Петергоф — настоящий must visit." +
                                "Это самая роскошная императорская резиденция в Европе. " +
                                "Ее можно сравнить разве только с Версалем. Со мной вы прогуляетесь по " +
                                "аллеям парка, узнаете об уникальной фонтанной системе и увидите самые известные фонтаны. " +
                                "Когда-то по этим аллеям ходили императорские особы и европейские " +
                                "послы, простой человек не имел доступа. А сейчас у вас есть возможность " +
                                "прогуляться среди фонтанов и узнать историю этого удивительного места. " +
                                "Я вам расскажу, как появился Петергоф и кто участвовал в строительстве, как работают работают " +
                                "фонтаны и кто придумал уникальную фонтанную систему. И, конечно же, вы " +
                                "увидите Большой каскад, фонтан «Самсон», небольшие фонтаны-шутихи и " +
                                "насладитесь панорамой Финского залива. ",
                        "http://images.myshared.ru/19/1238834/slide_20.jpg;" +
                                "http://orbitaart.ru/img/petergof-big.jpg",
                        new BigDecimal(3500), categoriesList34, null);
                tourRepository.save(tours[2]);

                //categoriesList4, tour4
                ArrayList<Category> categoriesList4 = new ArrayList<>();
                categoriesList4.add(category4);

                tours[3] = new Tour(null, "Экскурсия по Эрмитажу с гидом",
                        "Побывать в Эрмитаже стоит каждому, ведь здесь представлены сокровища" +
                                "мировой культуры. Профессиональный гид обратит ваше внимание на неприметные" +
                                "детали и расскажет обо всем, что сами вы могли бы проскользнуть взглядом или вовсе" +
                                "обойти стороной. Помимо этого, вас ждет подробный и обстоятельный рассказ" +
                                "об истории и архитектуре Петербурга и России с ответами на любые интересующие вас вопросы." +
                                "Для того, чтобы познакомиться со знаковыми произведениями Европы со времен" +
                                "античности, вы с гидом проследуете по парадным залам Старого и " +
                                "Нового Эрмитажа, уделив особое внимание Картинной галерее." +
                                "Начало маршрута — у Иорданской лестницы. Отсюда мы поднимемся на второй этаж, где" +
                                "представлено собрание западноевропейского искусства. Начнем с живописи эпохи" +
                                "Ренессанса и главных ее представителей: Леонардо да Винчи, Рафаэля и Тициана." +
                                "Затем зайдем в Рыцарский зал с доспехами разных исторических периодов. После этого" +
                                "перейдем в залы с голландской живописью, где увидим картины Рубенса и Рембрандта." +
                                "Завершим экскурсию, перейдя из египетского зала с саркофагами и мумией в залы античного искусства.",
                        "https://grandgames.net/puzzle/source/aleksandrovskij_zal.jpg;" +
                                "https://554a875a-71dc-4f5f-b6bf-ae8967f137d5.selcdn.net/thumbs2/92951ac6-d37b-11e7-b081-6e714efd800d.800x600.jpg",
                        new BigDecimal(1500), categoriesList4, null);
                tourRepository.save(tours[3]);

                //categoriesList14, tour5
                ArrayList<Category> categoriesList14 = new ArrayList<>();
                categoriesList14.add(category1);
                categoriesList14.add(category4);

                tours[4] = new Tour(null, "Экскурсия в Кронштадт с теплоходной прогулкой",
                        "Приглашаем на автобусную экскурсию в Кронштадт. Это самый удаленный " +
                                "из 7 пригородов Северной столицы. Добраться до него можно" +
                                "водным путем, на катере, либо по дамбе на автобусе. Этот город — морской форпост, " +
                                "который защищал Питер почти три столетия. В нем находится около" +
                                "300 архитектурно-исторических памятников. А Кронштадская крепость входит в" +
                                "знаменитый список Всемирного наследия от ЮНЕСКО." +
                                "Экскурсия в Кронштадт – это не просто поездка за яркими впечатлениями" +
                                "и эмоциями, это погружение в другую реальность, о которой вы" +
                                "могли слышать на уроках истории или чувствовать, читая какую-нибудь" +
                                "историческую книгу. Теперь же у вас есть прекрасная возможность" +
                                "не только услышать, но и увидеть все своими глазами. Во время экскурсии" +
                                "вы осмотрите гидротехнические и оборонительные сооружения, огромное " +
                                "количество исторических и архитектурных памятников и многое другое. Также во " +
                                "время поездки вас будет сопровождать профессиональный гид, который " +
                                "расскажет много интересного из жизни Кронштадта.",
                        "https://554a875a-71dc-4f5f-b6bf-ae8967f137d5.selcdn.net/thumbs2/4bd8007e-d8c9-11eb-b1d8-a6bf20dac565.800x600.jpg;" +
                                "https://grandgames.net/puzzle/source/utro_v_kronshtadte.jpg",
                        new BigDecimal(2250), categoriesList14, null);
                tourRepository.save(tours[4]);

                //categoriesList1, tour6
                tours[5] = new Tour(null, "Прогулка на теплоходе «Ладога»",
                        "Предлагаем вам устроить незабываемую прогулку по рекам" +
                                "и каналам Петербурга. На борту уютного комфортабельного теплохода «Ладога»" +
                                "есть все, что необходимо для организации веселой вечеринки" +
                                "или камерного вечера в компании друзей." +
                                "Вы сможете отдохнуть, устроить небольшой банкет" +
                                "и даже потанцевать. При желании можно будет пригласить" +
                                "гида, который будет сопровождать вас в пути и рассказывать о" +
                                "достопримечательностях, мимо которых вы будете проходить на теплоходе." +
                                "Если похолодает, мы включим отопление в салоне и выдадим" +
                                "пледы тем, кто захочет остаться на верхней палубе. Наш теплоход" +
                                "идеально подойдет для девичника, дня рождения или вечеринки в нестандартной обстановке.",
                        "https://maptab.ru/images/gallery/ekspozitsii/3098.jpg;" +
                                "https://img-fotki.yandex.ru/get/50061/288862304.39/0_150fd5_bd3200ae_orig.jpg",
                        new BigDecimal(2000), categoriesList1, null);
                tourRepository.save(tours[5]);

                //categoriesList5, tour7
                ArrayList<Category> categoriesList5 = new ArrayList<>();
                categoriesList5.add(category5);

                tours[6] = new Tour(null, "Мифы и легенды Петербурга",
                        "Не секрет, что Петербург основан в болотистой местности, которую обходили" +
                                "стороной и ничего там не строили. Спасибо Петру: за несколько веков жизни" +
                                "город превратился в парадные ворота страны. Но тайная, темная сторона," +
                                "постоянно нависает над городом. Мы приоткроем для вас завесу тайны и" +
                                "расскажем некоторые легенды о любимом городе, мы отправимся на" +
                                "комфортном автобусе по самым мистическим местам Северной столицы." +
                                "На экскурсиях, которые начинаются в 13:00 и 16:00 мы также увидим" +
                                "башню Грифонов, легшую в основу мифов об алхимических опытах и поске философского" +
                                "камня в дореволюционном Санкт-Петербурге начала XX века." +
                                "Во время экскурсии у нас будут остановки в местах, которое лучше всего подходят под" +
                                "описание мистических достопримечательностей. Мы прогуляемся у Михайловского" +
                                "замка, который смотрится особенно таинственно в вечерней подсветке." +
                                "Ну и конечно, мы полюбуемся Сфинксами и Исаакиевским собором.",
                        "https://www.fiesta.ru/uploads/slider_image/image/17507/v880_mustafina_9.jpg;" +
                                "https://grandgames.net/puzzle/source/piter_5_uglov.jpg",
                        new BigDecimal(2000), categoriesList5, null);
                tourRepository.save(tours[6]);

                //categoriesList23, tour8
                ArrayList<Category> categoriesList23 = new ArrayList<>();
                categoriesList23.add(category2);
                categoriesList23.add(category3);

                tours[7] = new Tour(null, "Выборг — средневековый город и крепость",
                        "Выборг — единственный европейский средневековый город в стране с" +
                                "настоящим рыцарским замком и сохранившимся историческим центром." +
                                "Родина архитектуры Северного модерна." +
                                "В ходе экскурсии мы побываем в Выборгском замке, увидим самый" +
                                "древний жилой дом в России, посетим загородный приморский" +
                                "живописный парк Монрепо — одну из красивейших дворянских" +
                                "усадеб России. Вы узнаете, сколько раз Выборгский замок пытались" +
                                "взять русские войска, а сколько — шведские. Почему от средневековья" +
                                "в Выборге осталось так мало и так много." +
                                "Из средневековых зданий сохранились Круглая башня, Рыцарский дом," +
                                "Часовая башня и руины Старого собора,башня Ратуши; бастион Панцерлакс." +
                                "Увидим памятник Торгильсу Кнутсону и зданию Ратуши, идем в замок, где" +
                                "поднимаемся на башню Св. Олафа. Также увидим" +
                                "бастионы крепости XVIII века Анненкрон.",
                        "https://erm.vbgcity.ru/sites/default/files/krepostaya.jpg;" +
                                "https://izo-life.ru/wp-content/uploads/Vyborg_akvarel_Trushnikova-800x600.jpg",
                        new BigDecimal(4000), categoriesList23, null);
                tourRepository.save(tours[7]);

                //categoriesList5, tour9
                tours[8] = new Tour(null, "Меняем музеи на заброшки под Петербургом!",
                        "Вас ждет индустриальный маршрут по Ленинградской области!" +
                                "Вместо парадных зданий — окутанные флером загадочности" +
                                "заброшенные объекты, дивная природа, дух исследований." +
                                "Мы проедем по старым детским лагерям, получим дозу" +
                                "адреналина, сделаем яркие фото. А чтобы отдохнуть от" +
                                "«фильмов ужасов», погуляем по Линдуловской роще и" +
                                "полюбуемся Ладожским озером." +
                                "Мы обсудим, что еще можно делать в покинутых местах." +
                                "Например, нестандартные фото для ленты на фоне фактур и внутри" +
                                "строений. После поедем в Линдуловскую рощу — это словно сладкая пилюля" +
                                "после знакомства с жутковатыми заброшками. В завершение" +
                                "устроим пикник на берегу Ладожского озера!",
                        "http://www.hiddenside.ru/photos/industrial/lo/zabroshennyy_detskiy_lager_leninets_roshchino_2015/37.JPG;" +
                                "http://www.hiddenside.ru/photos/industrial/lo/zabroshennyy_detskiy_lager_leninets_roshchino_2015/41.JPG",
                        new BigDecimal(3500), categoriesList5, null);
                tourRepository.save(tours[8]);

                //categoriesList1, tour10
                tours[9] = new Tour(null, "Водная прогулка по Ладожским шхерам на моторной лодке",
                        "Рассекая водную гладь, мы полюбуемся отвесными скалами и" +
                                "выйдем в открытую Ладогу и даже разглядим вдалеке остров Валаам." +
                                "Высадимся на один из островков и устроим мини-пикник, а также" +
                                "попробуем отыскать краснокнижных ладожских нерп" +
                                "(лучшее время для фотоохоты — май и июнь)." +
                                "Перед отплытием наш капитан расскажет о технике безопасности на воде. " +
                                "Прогулки проходят в камерной атмосфере: мы делимся" +
                                "впечатлениями, подсказываем ракурсы для фото и уголки острова для" +
                                "созерцания красот. Вы, конечно, узнаете о флоре, фауне" +
                                "и истории Ладоги — например, о том, что здесь делал Пётр I." +
                                "Услышите мифы и легенды края, древние и современные.",
                        "http://www.varvar.ru/kola/seydozero/images/seydozero13-anna-mihaylova-seydjavr.jpg;" +
                                "https://turgeek.ru/upload/tour/image_main/8460/big-ladozskie-shery-i-mesta-sily-karelii-na-katere-1-den.jpg",
                        new BigDecimal(5500), categoriesList1, null);
                tourRepository.save(tours[9]);

                //categoriesList4, tour11
                tours[10] = new Tour(null, "Экскурсия в Русский Музей",
                        "Роскошный Михайловский дворец — сокровищница, в которой" +
                                "хранятся как древнерусские иконы, так и шедевры скульптуры и" +
                                "живописи XVIII-XIX веков. Предлагаю вам посмотреть на них" +
                                "вместе со мной, отыскивая незаметные на первый взгляд детали." +
                                "Мы пройдем по залам величественного Михайловского дворца, а" +
                                "я расскажу вам, как императорская резиденция превратилась в музей," +
                                "и как менялось отношение к искусству в дореволюционной России." +
                                "Картины Репина, Васнецова, Айвазовского и других российских" +
                                "мастеров прекрасно дополняют изящные дворцовые интерьеры, так" +
                                "что наша экскурсия будет насыщенной впечатлениями и эмоциями" +
                                "от соприкосновения с произведениями искусства.",
                        "https://ic.pics.livejournal.com/ilotan136/26726131/4949597/4949597_800.jpg;" +
                                "https://images.vfl.ru/ii/1540717219/10fc4e0f/23970650_m.jpg",
                        new BigDecimal(1000), categoriesList4, null);
                tourRepository.save(tours[10]);

                //categoriesList4, tour12
                tours[11] = new Tour(null, "Юсуповский дворец: по княжеским жилым покоям",
                        "В дворце на набережной реки Мойки в Санкт-Петербурге жили" +
                                "несколько поколений княжеского рода Юсуповых." +
                                "Здесь убили «царского друга» Григория Распутина." +
                                "За скромным фасадом комплекса скрываются богатые залы," +
                                "оранжереи, сады и даже театр. Красота исторического здания " +
                                "пережила революции, блокаду Ленинграда и сохранилась до наших дней." +
                                "С годами дворец превратился в культурный и общественный центр." +
                                "В нем устраивают встречи чиновников, политиков и дипломатов," +
                                "конференции и симпозиумы. Вы увидите будуары и приватные комнаты " +
                                "Зинаиды Николаевны, последней в роду Юсуповых. Помещения практически не " +
                                "претерпели никаких изменений. Там стоит розовый диванчик, на котором Юсупова" +
                                "позировала для портрета Валентина Серова.",
                        "https://forumimage.ru/uploads/20111029/131989350160007469.jpg;" +
                                "https://images.vfl.ru/ii/1541247441/979b3022/24048066_m.jpg",
                        new BigDecimal(1200), categoriesList4, null);
                tourRepository.save(tours[11]);

                for (int i = 0; i < 12; i++) {
                    Event event1 = new Event(null, tours[i], LocalDateTime.of(2022, 3, 20, 15, 0), 10);
                    Event event2 = new Event(null, tours[i], LocalDateTime.of(2022, 3, 27, 15, 0), 10);
                    eventRepository.save(event1);
                    eventRepository.save(event2);
                }

                Certificate certificate1 = new Certificate(null, BigDecimal.valueOf(1000));
                Certificate certificate2 = new Certificate(null, BigDecimal.valueOf(3000));
                Certificate certificate3 = new Certificate(null, BigDecimal.valueOf(5000));
                certificateRepository.save(certificate1);
                certificateRepository.save(certificate2);
                certificateRepository.save(certificate3);

                certificateItemRepository.save(new CertificateItem(null, 111, false, certificate1));
                certificateItemRepository.save(new CertificateItem(null, 222, false, certificate2));
                certificateItemRepository.save(new CertificateItem(null, 333, false, certificate3));

                Role role = new Role(null, "USER");
                roleRepository.save(role);
                userService.saveUser(new UserRegistrationDTO("Pavel", "Smirnov", "smpas",
                        "1234", "1234"));
                userService.addTourToFavorite(1L, 3L);
                userService.addTourToFavorite(1L, 7L);
                userService.addTourToFavorite(1L, 9L);

                discountRepository.save(new Discount(null, "full", new BigDecimal(1)));
                discountRepository.save(new Discount(null, "seniors", new BigDecimal("0.7")));
                discountRepository.save(new Discount(null, "minors", new BigDecimal("0.5")));
            }
        };
    }
}