# My New Plugin

[Download myPlugin](https://github.com/nilswaldowski/my-plugin/archive/master.zip) / [View the demo](http://nilswaldowski.github.io/my-plugin/)



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

### 1. Include MyPlugin on your site

```html
<script src="dist/javascript/my-plugin.js"></script>
```

### 2. Add the markup to your HTML

Turn blabla by adding the `[data-blub]` data attribute.

```html
<div data-blabla>Example</div>
...
<div data-blabla>Example</div>
```

### 3. Initialize MyPlugin

In the footer of your page, after the content, initialize MyPlugin. And that's it, you're done. Nice work!

```html
<script>
	myPlugin.init();
</script>
```



## Installing with Package Managers

You can install MyPlugin with your favorite package manager.

* **[NPM](https://www.npmjs.org/):** `npm install nilswaldowski/my-plugin`
* **[Bower](http://bower.io/):** `bower install https://github.com/nilswaldowski/my-plugin.git`



## Working with the Source Files

If you would prefer, you can work with the development code in the `src` directory using the included [Gulp build system](http://gulpjs.com/). This compiles, lints, and minifies code.

### Dependencies
Make sure these are installed first.

* [Node.js](http://nodejs.org)
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
3. When it's done installing, run one of the task runners to get going:
	* `gulp` manually compiles files.
	* `gulp watch` automatically compiles files when changes are made and applies changes using [BrowserSync](https://browsersync.io/).



## Options and Settings

MyPlugin includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Global Settings

You can pass options and callbacks into MyPlugin through the `init()` function:

```javascript
myPlugin.init({
	selector: '[data-blub]', // Selector for links (must be a class, ID, data attribute, or element tag)
	callback: function ( anchor, toggle ) {} // Function to run after ...
});
```

***Note:*** *To programatically add MyPlugin to all anchor links on a page, pass `selector: 'a[href^="#"]'` into `init`.*

### Override settings with data attributes

MyPlugin also lets you override global settings with the `[data-options]` data attribute.

```html
<a data-blub
   data-options='{
					"speed": 500
				}'
>
	Anchor Link
</a>
```

***Note:*** *You must use [valid JSON](http://jsonlint.com/) in order for the `data-options` feature to work. Does not support the `callback` method.*

### Use MyPlugin events in your own scripts

You can also call MyPlugin events in your own scripts.

#### destroy()
Destroy the current `MyPlugin.init()`. This is called automatically during the `init` function to remove any existing initializations.

```javascript
MyPlugin.destroy();
```

## Browser Compatibility

MyPlugin works in all modern browsers, and IE 9 and above.

MyPlugin is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, anchor links will jump the way they normally would.


## Known Issues


## License

The code is available under the [MIT License](LICENSE.md).
