

### CRM для продажи услуг it-компании <br > 
#### CRM for selling IT company services 

---
##### React (typescript, js), Laravel(php), MySQL, GitHub    
---



# Функционал, Основные требования (декомпозиция)

## 1. Клиентский сайт (для заказчиков) 

#### 1.1 Возможность оставить заказ  

#### 1.2 Просмот возможных вариантов услуг 
- Разработка 
    - Landing page
    - ИНТЕРНЕТ-МАГАЗИН 
    - КОРПОРАТИВНЫЙ САЙТ
    - Разработка мобильных приложений 
- Реклама 
    - продвижение
    - таргетинговая, контекстная реклама
    
- Дизайн 
    - создание макета
    - верстка 
    - логотип 
    
- Поддержка проекта 
    - Перевод на другую технологию 
    - Оптимизация 
    
#### 1.3 Вся информация для обратной связи с компанией (КОНТАКТЫ)
- Телефоны 
- Почта 
- Соц. сети 
- Карта места нахождения компании 

#### 1.4 О компании 

#### 1.5 Примеры работ компании 

#### 1.6 Вакансии 
- Отправка резюме 
- Просмотр пребуемых специалистов 

#### 1.7 Вход в личны кабинет клиета 
- Логин, Регистация, 
- Возможность отслеживать состояние заказа *(регистрация не обязательная)* 
- Список заказов с возмодностью посмотреть срез проект на текущей стадии 
- Личная информация 

#### 1.8 Онлайн помощьник-консультант [Омниканальные платформы](https://emailmatrix.ru/blog/omnichannel-platform/)) 

---
---
---

## 2. Сайт для сотрудников *(разработчики, администраторы, менеджера)*

#### 2.1 Регистрация только по ссылке которая пришла на почту 
#### 2.2 Каждый получает ту информацию которая соотвецтвует области его специализации или роли 

### 2.3 Страницы

#### 2.3.1 Дашборд 
- Список сотрудников 
- Список клиентов 
- Список проектов   
- Текущие задачи 
- Календарь (события, график работы) 
- Кол. активных проектов и тд. 

#### 2.3.2 Проект
- информация о проекте (название, заказчик, гонорар, тз, тип, сроки)     
- участники (с указанием личного гонорара за проект (види только админ и менеджер)), активность, 
- стадия, прогресбар 
- канбан доска (backlog), возможность пометить задачу: приоретет, цвет, вид (реализаия фичи, исправления бага), доп. опции, возможность админа или руководителя добавлять задачу участнику проекта 
 
- диаграмма ганта * 
- ссылки на гитхаб, джира, и тд. 
- история действий проекта (кто кого добавил, кто изменил состояние проекта и когда ) 
- загрузка доп. файлы (диаграмы бд, макет, )
- права доступа к проекту (readonly, participant, supervisor, admin) 

#### 2.3.2 Проекты
- сортировка(по профиту, по дате, по кол. участников, алфавиту), фильт, пагинация 

#### 2.3.3 Сотрудники 
- Основная информация: фио, дата рождения, специализация, должность, количество работ(завершённых или нет, в процессе), дата рождения, 
- возможность сортировки(по алфавиту, дата регистрации, кол. завершенных проектов, время в команде), фильтрации 
- поиск по фио 
- список техногогий, теги 
- избранные 

#### 2.3.3 Вакансии     
- список вакансий с основной информацией 
- возможность менять состояния вакансий (в расмотрении, назначенна встреча, принята, отклоненна) 

#### 2.3.4 Клиенты 
- Основная информация: имя, телефон, почта, кол. заказов(успешных или нет), дата рождения 
- Сортировка, фильтр, поиск, пагинация 
- возможность помечать клиентов как vip/избранные 
- скачать в формате excel * 
- комментарии к клиенту 

#### 2.3.5 Настройки 
- CRUD для стадий 

#### 2.3.5 Статистика 
- Количество прибыли за проекты по каждому типу проекта 
- динамика работы (по прибыли, заказам, виду проекта), 
- воронка продаж в процентах, числах и графически (кол. визитов на сайт, из них оставили заявку, из них вышли на связь, из них согласовавших тз, из них сделали предоплату(первый платёж), из них завершино с полной оплатой) 

#### 2.3.5 Профиль 
- полная информация (фио, фото, должность) 
- подключить соц. сети 

#### 2.3.5 Задачи и события 
- привязка задачи к клиенту, сотруднику или проекту, вакансии 
- текст и время 
- сортирока, фильтр, пагинация     
- Плановые события (встречи для проведения митингов) 

#### 2.3.5 Почта 
- Почтовая рассылка клие нтам(персональные скидки, изменение статуса заказа)/сотрудникам(подключение к проекту)  
- Отправка реквизитов для оплаты, договора 

#### 2.3.6 График работы (для админа и менеджера)  
- График работы сотрудников 

#### 2.3.5 Новости (для сотрудников) 

---
---
---

## 3. API (сервер) 

#### 3.1 Каналы обзения 
- Viber 
- Telegram 

#### 3.1 Роли 
- клиент 
- Работник 
- Администратор (возможность добавлять сотрудников)   

#### 3.1 Роли в проекте 
- участник 
- руководитель 
- наблюдатель 
- админ 

#### 3.2 Специализация  
- Дизайнер 
- Backend 
- Frontend 
- PR 
- Менеджер по работе с клиентами 

#### 3.3 Стадии проекта 

Публичные стадии (для клиента и менеджера)  
Приватные стадии (для разработчиков) 
Возможность создавать новые стадии 
Стадии зависят от типа проекта (разработка с нуля, поддержка) 


General: 
- Заявка на расмотрении 
- Оплачено (если по предоплате иначе в конце) 
- Завершино 
- Отменён 

Manager: 
- Оформление ТЗ и утверждение его исполнителем и заказчиком
- Аналитика и Оценка проекта(время, цена) 

Design: 
- Создание и утверждение заказчиком макета сайта.
- Рисование дизайна и утверждение заказчиком. 

Frontend: 
- Верстка html страниц
- Проверка адаптивности 
- Интеграция верстки

Backend: 
- Проектирования базы данных 
- Внедрение бд 
- Разработка бизнес логики 
- Тестирование и багофикс
- Запуск: Deploy на production сервер


--- Dispute 

- Mail Campaning 
- Invoice 


Vasily Dobkin
dogapay828@agrolivana.com 
380934611664

















    <Card className={styles['card-box mb-4']}>
                <div className={styles['card-header']}>
                    <div className={styles['card-header--title']}>
                        <small>Tables</small>
                        <b>This table card has custom content</b>
                    </div>
                    <Box className={styles['card-header--actions']}>
                        <IconButton
                            size="small"
                            color="primary"
                            title="View details">
                            className={styles['text-primary']}
                            keyboard
                            {/*<FontAwesomeIcon*/}
                            {/*    icon={['far', 'keyboard']}*/}
                            {/*    className="font-size-lg"*/}
                            {/*/>*/}
                        </IconButton>
                    </Box>
                </div>
                <CardContent className="p-0">
                    <div className={styles['table-responsive']} >
                        <table className={styles['table table-striped table-hover text-nowrap mb-0']}>
                            <thead
                                className={styles['thead-light']}
                            >
                            <tr>
                                <th style={{ width: '40%' }}>Employee</th>
                                <th className={styles['text-center']} >Status</th>
                                <th className={styles['text-center']}>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className={styles['d-flex align-items-center']}>
                                            <Avatar className={styles['mr-2']} alt="..." src={avatar2} />
                                            <div>
                                                <a
                                                    className={styles['font-weight-bold text-black']}
                                                    href="#/"
                                                    onClick={e => e.preventDefault()}
                                                    title="...">
                                                    Shanelle Wynn
                                                </a>
                                                <span
                                                    className={styles['text-black-50 d-block']}
                                                >
                                                      UI Engineer, Apple Inc.
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles['text-center']}>
                                        <div
                                            className={styles['h-auto py-0 px-3 badge badge-warning']}>
                                            Pending
                                        </div>
                                    </td>
                                    <td className={styles['text-center']}>
                                        <Box>
                                            <IconButton
                                                color="primary"
                                                size="small"
                                            >
                                                ellipsis
                                                {/*<FontAwesomeIcon icon={['fas', 'ellipsis-h']} />*/}
                                            </IconButton>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={styles['d-flex align-items-center']}>
                                            <Avatar alt="..." src={avatar1} className="mr-2" />
                                            <div>
                                                <a
                                                    className={styles['font-weight-bold text-black']}
                                                    href="#/"
                                                    onClick={e => e.preventDefault()}
                                                    title="...">
                                                    Beck Simpson
                                                </a>
                                                <span className={styles['text-black-50 d-']}>
                                                  Frontend Developer
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles['text-center']}>
                                        <div
                                            className={styles['badge badge-success h-auto py-0 px-3']}>
                                            Completed
                                        </div>
                                    </td>
                                    <td className={styles['text-center']}>
                                        <Box>
                                            <IconButton color="primary" size="small">
                                                ellipsis
                                                {/*<FontAwesomeIcon icon={['fas', 'ellipsis-h']} />*/}
                                            </IconButton>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={styles['d-flex align-items-center']}>
                                            <Avatar
                                                alt="..." src={avatar3}
                                                className={styles['mr-2']}
                                            />
                                            <div>
                                                <a
                                                    href="#/"
                                                    onClick={e => e.preventDefault()}
                                                    className={styles['font-weight-bold text-black']}
                                                    title="...">
                                                    Regan Norris
                                                </a>
                                                <span
                                                    className={styles['text-black-50 d-block']}
                                                >
                                                    Senior Project Manager
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles['text-center']}>
                                        <div className={styles['h-auto py-0 px-3 badge badge-danger']}>
                                            Declined
                                        </div>
                                    </td>
                                    <td className={styles['text-center']}>
                                        <Box>
                                            <IconButton color="primary" size="small">
                                                ellipsis
                                                {/*<FontAwesomeIcon icon={['fas', 'ellipsis-h']} />*/}
                                            </IconButton>
                                        </Box>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>