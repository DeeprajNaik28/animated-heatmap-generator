# HeatmapFX

HeatmapFX is an interactive web application that transforms uploaded images into animated heatmap-style visual effects using WebGL shaders. Users can upload an image, apply different visual presets, customize animation parameters, and export short animated recordings directly from the browser.

## Features

* Upload images (JPG, PNG, WEBP)
* Real-time shader-based rendering
* Multiple visual presets:

  * 🌈 Thermal
  * 🔥 Lava
  * ☣ Toxic
  * 🌊 Ocean
  * ⚡ Glitch
* Adjustable controls:

  * Animation Speed
  * Distortion Strength
  * Glow Intensity
* Live image preview
* Hide/Show control panel
* 5-second animation recording export
* Fully browser-based processing
* Mobile-friendly responsive interface

## Tech Stack

* React
* Vite
* Three.js
* GLSL Shaders
* WebGL
* MediaRecorder API

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd heatmapfx
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Build

Create a production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Deployment

The project is deployed on:

* Vercel

Since all processing happens in the browser, no backend server is required.

## Status

Current version includes:

* Image upload
* Animated heatmap effects
* Preset selection
* Custom effect controls
* Animation recording

Planned future updates:

* Higher-quality video exports
* Advanced motion effects
