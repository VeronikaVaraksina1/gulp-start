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

3. To build the production files:
   `gulp build`

This command:

- Cleans the dist folder.
- Copies CSS, JavaScript, HTML, fonts, images, and sprites into the dist folder.

## Function Descriptions (gulpfile.js)

- fontsConvert: This function converts .woff and .woff2 font files into Base64-encoded CSS, which is then written to the assets/styles/ directory. This is useful for embedding fonts directly in CSS files to reduce the number of HTTP requests. The function also triggers a live reload with browserSync to update the changes in real-time during development.

Command:

`gulp fontsConvert`

- images: This function processes image files in the assets/i/src/ directory. It checks if the image files are new or updated using gulp-newer, converts them to the WebP format with a quality setting of 80 using gulp-webp, and optimizes them with gulp-imagemin for better performance. The processed images are saved to assets/i/dist/. The function also includes browserSync streaming to reflect changes without reloading the browser.

Command:

`gulp images`

- sprite: This function generates an SVG sprite sheet from individual SVG icons located in the assets/i/dist/icons/ directory using gulp-svg-sprite. The output is a sprite file named sprite.svg saved in assets/i/sprite/. This method is efficient for using multiple icons in a web project, reducing the number of HTTP requests and enabling better maintenance of SVG assets.

Command:

`gulp sprite`

- copySprite: This function copies the generated sprite.svg file from assets/i/dist/sprite/ to dist/i/dist/sprite/ as part of the build process. This ensures that the sprite is included in the final distribution for deployment.

Command:

`gulp copySprite`

These functions help automate the development workflow, optimize resources, and enhance performance in web projects.

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
