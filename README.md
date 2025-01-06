# NeoRange

[Русская версия](README.ru.md)

A modern, customizable dual-thumb range slider with a sleek neon design.

[![Author](https://img.shields.io/badge/Author-Viorel%20Odajiu-blue.svg)](https://github.com/newtoneweb)
[![Documentation](https://img.shields.io/badge/Documentation-View%20Docs-green.svg)](https://newtoneweb.github.io/neo-range/docs/)
[![Demo](https://img.shields.io/badge/Demo-Live%20Preview-orange.svg)](https://newtoneweb.github.io/neo-range/)

## Repository
GitHub: [https://github.com/newtoneweb/neo-range](https://github.com/newtoneweb/neo-range)

## Demo
Try it live: [https://newtoneweb.github.io/neo-range/](https://newtoneweb.github.io/neo-range/)

## Features

- Dual thumb range selection
- Customizable scale with main markers and segments
- Interactive tooltips
- Modern neon design with customizable colors
- Responsive and mobile-friendly
- Easy to integrate and customize

## Usage

1. Include the required files:
```html
<link rel="stylesheet" href="libs/neo.range.css">
<script src="libs/neo.range.js"></script>
```

2. Create a container element:
```html
<div id="my-slider"></div>
```

3. Initialize the slider with options:
```javascript
const settings = {
    // input values
    min: -50,
    max: 100,
    step: 5,
    min_value: -5,
    max_value: 70,
    // scale settings
    use_scale_steps: true,
    scale_steps: 50,
    scale_segments: 5,
    // slider settings
    use_tooltip: true,
    prefix: "",
    suffix: "°C",
    // color settings
    color_primary: "#00cc99",
    track_color: "rgb(0 255 187 / 0.4)",
    tooltip_bg_color: "rgb(0 255 187 / 0.2)",
    // size settings
    marker_size: "15px",
    track_height: "2px",
};

const slider = new NeoRange('#my-slider', settings);
```

## Options

### Input Values
- `min`: Minimum value of the range
- `max`: Maximum value of the range
- `step`: Step increment
- `min_value`: Initial value for the left thumb
- `max_value`: Initial value for the right thumb

### Scale Settings
- `use_scale_steps`: Enable/disable scale display
- `scale_steps`: Number of main scale markers
- `scale_segments`: Number of segments between main markers

### Slider Settings
- `use_tooltip`: Enable/disable tooltips
- `prefix`: Value prefix (e.g., "$")
- `suffix`: Value suffix (e.g., "°C")

### Color Settings
- `color_primary`: Primary color for thumbs and active track
- `track_color`: Color for inactive track
- `tooltip_bg_color`: Background color for tooltips

### Size Settings
- `marker_size`: Size of the slider thumbs
- `track_height`: Height of the slider track

## Methods

- `getRange()`: Returns the current selected range as `{from: number, to: number}`

## License

MIT License
