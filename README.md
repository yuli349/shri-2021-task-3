# ШРИ 2021. Задание 3. Найти ошибки.
## Как запустить

1. Клонировать репозиторий

    ```
    git clone https://github.com/yuli349/shri-2021-task-3.git
    ```

2. Установить зависимости

    ```
    npm ci
    ```

3. Запустить dev-сервер

    ```
    npm start
    ```

Должен открыться плейер в браузере.

## Порядок выполнения
- почитала про RxJs;
- запустила приложение, поправив ошибки и warnings;
- прикрутила eslint;
- починила кнопки переключения слайдов;
- поправила смену тем, так как при переключении они не зачищались;
- починила поочредное отображение слайдов;
- добавила stories.js, stories.css, папку static с медиа файлами, и выходные данные в data.ts => стали отображаться поочередно все слайды из первого задания;
- порефакторила интерактивность, связанную с 3 и 5 слайдами (выбор участника и переключение слайдера).