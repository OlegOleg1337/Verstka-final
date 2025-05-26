# Lesson 8.5. Task: How to Start

To get started, clone the repository `https://github.com/Habsida-Projects/webpack-static-template`(`git clone https://github.com/Habsida-Projects/webpack-static-template.git`).

The repository already has:
- webpack
- autoprefixer
- scss-loader

[What is webpack?](https://www.freecodecamp.org/news/an-intro-to-webpack-what-it-is-and-how-to-use-it-8304ecdc3c60/)

[Webpack documentation](https://webpack.js.org/)

### What is Autoprefixer?

Autoprefixer is a tool that automatically adds vendor prefixes to CSS properties.

[See it in action](https://autoprefixer.github.io/).

### How to Start Development?

Previously, you wrote your HTML in the `index.html` file and CSS in the `style.css` file, which you linked to the page using a link tag.

Now, everything works the same way, but webpack handles linking the styles to the page. You specify an entry point, and webpack goes through all the imports from this point, compiles them into one file, and links it to the page.

The same process applies to JS files. Webpack takes the entry point file, goes through all imports, and compiles them into one file.

The entry point for SCSS is `src/scss/style.css`.

To add a file to the build, write in `src/scss/style.css`:
```css
@import './path/to/filename.scss';
```
P.S: If you write another `@import` inside a file that has already been imported into `src/scss/style.css`, webpack will include it as well.

### How to Split CSS into Files?

Split based on BEM blocks: one file per block.

The entry point for JS is `src/js/index.js`.

To add a file to the build, write in `src/js/index.js`:
```js
import fileName from './path/to/filename';
```

In another file (the one you import), you need to export functions/variables, etc.
```js
export const myVariable = 'Block 7';
```
[Imports and Exports](https://javascript.info/import-export)

P.S: If you write another `import` inside a file already imported in `src/js/index.js`, webpack will include it as well.

### Where to place images?

Add images to the `src/img` folder and reference them in HTML as `./img/...`.

### How to View the Result?

After building, webpack places all files in the `dist` folder.

To view your project, open the `dist/index.html` file in your browser.

You can also check the compiled JS files in the `dist/js` folder and the CSS files in the `/dist/css` folder.

## Questions

### Why is the entry point specifically `src/js/index.js`?

Because we specified it [here](https://github.com/Habsida-Projects/webpack-static-template/blob/a3c92947edf1eddc7fcaf1c776b5bdccf6f4f7df/webpack.config.js#L9).

You can change the entry point and rename/change files to see what happens.

### Why is the entry point for SCSS specifically `src/scss/style.scss`?

Because we [imported](https://github.com/Habsida-Projects/webpack-static-template/blob/a3c92947edf1eddc7fcaf1c776b5bdccf6f4f7df/src/js/index.js#L1) this file in our JS entry point.

### How does webpack understand what to do with `*.scss` imports?

We specify this in the [config](https://github.com/Habsida-Projects/webpack-static-template/blob/master/webpack.config.js#L36).

By the way, the same thing happens with [images](https://github.com/Habsida-Projects/webpack-static-template/blob/a3c92947edf1eddc7fcaf1c776b5bdccf6f4f7df/webpack.config.js#L56) and [fonts](https://github.com/Habsida-Projects/webpack-static-template/blob/master/webpack.config.js#L46).

### Do I need to configure Autoprefixer?

No, we have already [done it](https://github.com/Habsida-Projects/webpack-static-template/blob/a3c92947edf1eddc7fcaf1c776b5bdccf6f4f7df/package.json#L27) for you.