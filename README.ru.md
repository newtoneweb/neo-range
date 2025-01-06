# NeoRange

[English version](README.md)

Современный, настраиваемый двойной ползунок с неоновым дизайном.

[![Автор](https://img.shields.io/badge/Автор-Viorel%20Odajiu-blue.svg)](https://github.com/newtoneweb)
[![Документация](https://img.shields.io/badge/Документация-Открыть-green.svg)](https://newtoneweb.github.io/neo-range/docs/)
[![Демо](https://img.shields.io/badge/Демо-Посмотреть-orange.svg)](https://newtoneweb.github.io/neo-range/)

## Репозиторий
GitHub: [https://github.com/newtoneweb/neo-range](https://github.com/newtoneweb/neo-range)

## Демо
Посмотреть демо: [https://newtoneweb.github.io/neo-range/](https://newtoneweb.github.io/neo-range/)

## Возможности

- Двойной ползунок для выбора диапазона
- Настраиваемая шкала с основными маркерами и сегментами
- Интерактивные подсказки
- Современный неоновый дизайн с настраиваемыми цветами
- Адаптивный и мобильный дизайн
- Простая интеграция и настройка

## Использование

1. Подключите необходимые файлы:
```html
<link rel="stylesheet" href="libs/neo.range.css">
<script src="libs/neo.range.js"></script>
```

2. Создайте контейнер:
```html
<div id="my-slider"></div>
```

3. Инициализируйте слайдер с настройками:
```javascript
const settings = {
    // значения ввода
    min: -50,
    max: 100,
    step: 5,
    min_value: -5,
    max_value: 70,
    // настройки шкалы
    use_scale_steps: true,
    scale_steps: 50,
    scale_segments: 5,
    // настройки слайдера
    use_tooltip: true,
    prefix: "",
    suffix: "°C",
    // настройки цветов
    color_primary: "#00cc99",
    track_color: "rgb(0 255 187 / 0.4)",
    tooltip_bg_color: "rgb(0 255 187 / 0.2)",
    // настройки размеров
    marker_size: "15px",
    track_height: "2px",
};

const slider = new NeoRange('#my-slider', settings);
```

## Настройки

### Значения ввода
- `min`: Минимальное значение диапазона
- `max`: Максимальное значение диапазона
- `step`: Шаг приращения
- `min_value`: Начальное значение левого ползунка
- `max_value`: Начальное значение правого ползунка

### Настройки шкалы
- `use_scale_steps`: Включение/выключение отображения шкалы
- `scale_steps`: Количество основных маркеров шкалы
- `scale_segments`: Количество сегментов между основными маркерами

### Настройки слайдера
- `use_tooltip`: Включение/выключение подсказок
- `prefix`: Префикс значения (например, "$")
- `suffix`: Суффикс значения (например, "°C")

### Настройки цветов
- `color_primary`: Основной цвет для ползунков и активной дорожки
- `track_color`: Цвет неактивной дорожки
- `tooltip_bg_color`: Цвет фона подсказок

### Настройки размеров
- `marker_size`: Размер ползунков
- `track_height`: Высота дорожки слайдера

## Методы

- `getRange()`: Возвращает текущий выбранный диапазон в виде `{from: number, to: number}`

## Лицензия

MIT License
