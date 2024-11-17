# Gulp Starter Build

This is a Gulp-based build setup for managing styles, scripts, and live reloading of your project.

## Plugins Used

- **gulp-pug**: Compiles Pug files to HTML.
- **gulp-sass**: Compiles SCSS files to CSS.
- **gulp-autoprefixer**: Adds vendor prefixes to CSS properties for cross-browser compatibility.
- **gulp-concat**: Concatenates multiple files into one.
- **gulp-uglify-es**: Minifies JavaScript files.
- **browser-sync**: Provides live reloading for development.
- **gulp-clean**: Cleans the dist directory.
- **gulp-purgecss**: Removes unused CSS selectors to reduce the size of CSS files.
- **gulp-cssfont64**: Converts font files to base64 and embeds them directly into CSS files.
- **gulp-imagemin**: Optimizes images to reduce file size without compromising quality.
- **gulp-newer**: Only processes files that are newer than their counterparts in the destination directory, improving build speed.
- **gulp-svg-sprite**: Combines multiple SVG files into a single SVG sprite, making it easier to manage icons.
- **gulp-webp**: Converts images to the WebP format for better compression and performance.

## Setup

1. Install the necessary dependencies:
   `npm install`

2. Start the development server:
   `gulp`

### This will:

- Compiles Pug files into HTML and places them in the assets directory.
- Compiles and prefixes SCSS into style.min.css in the assets/styles directory.
- Minifies and concatenates JavaScript into main.min.js in the assets/js directory.
- Converts fonts to base64 format and embeds them into CSS in the assets/styles directory.
- Optimizes images and converts them to WebP format, saving them in assets/i/dist.
- Generates an SVG sprite in assets/i/sprite/sprite.svg.
- Watches for changes in SCSS, JS, Pug, and HTML files and automatically reloads the browser using BrowserSync.

### Gulp tasks summary:

- gulp-cssfont64: Converts font files to base64 format and embeds them directly in CSS files. (gulp fontsConvert)
- gulp-imagemin: Optimizes images, reducing their size without quality loss. (gulp images)
- gulp-newer: Processes only files that are newer than their counterparts in the destination directory, speeding up the build process. (gulp images)
- gulp-purgecss: Removes unused CSS selectors to minimize the CSS file size. (gulp styles)
- gulp-svg-sprite: Combines multiple SVG files into a single SVG sprite for easier icon usage. (gulp sprite)
- gulp-webp: Converts images to the WebP format for better compression and performance. (gulp images)

3. To build the production files:
   `gulp build`

This command:

- Cleans the dist folder.
- Copies CSS, JavaScript, HTML, fonts, images, and sprites into the dist folder.

## Explanation of loadFont Function (font-loader.js)

- The function is borrowed from Glivera Team

The loadFont function is designed to dynamically load a web font by adding it to the document through JavaScript. This approach helps improve performance by asynchronously loading fonts and potentially using cached versions from localStorage.

### How to Use loadFont:

Call the function with the appropriate parameters:

`loadFont("font-name", "path/to/font.css");`

- "font-name": A unique identifier for the font.
- "path/to/font.css": The URL to the CSS file for the font.

### Example:

To load the roboto-regular font from the styles/roboto-regular.css file, you would use:

`loadFont("roboto-regular", "styles/roboto-regular.css");`
