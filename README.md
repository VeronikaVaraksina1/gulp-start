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
- **gulp-purgecss**: Removes unused CSS styles.

## Setup

1. Install the necessary dependencies:
   `npm install`

2. Start the development server:
   `gulp`

This will:

- Compile and prefix SCSS to style.min.css in the app/css directory.
- Minify and concatenate JavaScript into main.min.js in the app/js directory.
- Watch for changes in SCSS, JS, and HTML files and automatically reload the browser using BrowserSync.

3. To build the production files:
   `gulp build`

This will clean the dist folder and copy the minified styles, scripts, and HTML files to dist/ for deployment.

## Tasks

- gulp styles: Compiles and prefixes SCSS to CSS.
- gulp scripts: Minifies and concatenates JavaScript.
- gulp watching: Watches files for changes.
- gulp browsersync: Initializes live reloading.
- gulp build: Builds the project for production.
