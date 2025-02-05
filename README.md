# Simple Calendar Plugin for Obsidian

Плагин для создания ежедневных заметок с возможностью кастомизации формата даты и папки хранения.

![Demo](localhost) <!-- Замените на реальный скриншот -->

## Основные функции

- 📅 Автоматическое создание ежедневных заметок
- ⚡ Быстрый доступ через иконку в ленте
- ⚙️ Настройка формата даты (Luxon format)
- 📂 Указание кастомной папки для хранения
- 📝 Авто-генерация шаблона заметки

## Установка

1. В Obsidian: Settings → Community plugins → Browse → Поиск "Simple Calendar Plugin"
2. Или вручную:
   - Скачайте последний релиз из GitHub
   - Скопируйте файлы `main.js`, `manifest.json` в папку:
     ```
     .obsidian/plugins/simple-calendar-plugin/
     ```

## Использование

1. Нажмите на иконку календаря в левой ленте
2. Или используйте команду "Create daily note" из командной палитры (Ctrl/Cmd+P)

## Настройки

Перейдите в Settings → Community plugins → Simple Calendar Plugin:

- **Date format** - выбор формата даты:
  - ISO (2023-01-01)
  - European (01-01-2023)
  - American (01/01/2023)
  - Japanese (2023/01/01)
  
- **Storage folder** - путь для сохранения заметок (по умолчанию "Daily Notes")

## Для разработчиков

Требования:
- Node.js ≥ v16
- npm

Установка зависимостей:
```bash
npm install
```

Запуск в dev-режиме:
```bash
npm run dev
```

Сборка для production:
```bash
npm run build
```

## Поддержка

Если вы нашли баг или хотите предложить улучшение:
- [Создать issue на GitHub](https://github.com/DonTMover/obsidian-calendar-plugin/issues)
- Написать на email: [DonTMover@duck.com](mailto:DonTMover@duck.com)



## Лицензия

MIT License © 2024 DonTMover
