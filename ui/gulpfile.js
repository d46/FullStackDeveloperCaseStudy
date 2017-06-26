'use strict';

const gulp = require('gulp');  // Base gulp package
const babelify = require('babelify'); // Used to convert ES6 & JSX to ES5
const browserify = require('browserify'); // Providers "require" support, CommonJS
const notify = require('gulp-notify'); // Provides notification to both the console and Growel
const rename = require('gulp-rename'); // Rename sources
const sourcemaps = require('gulp-sourcemaps'); // Provide external sourcemap files
const gutil = require('gulp-util'); // Provides gulp utilities, including logging and beep
const chalk = require('chalk'); // Allows for coloring for logging
const source = require('vinyl-source-stream'); // Vinyl stream support
const buffer = require('vinyl-buffer'); // Vinyl stream support
const watchify = require('watchify'); // Watchify for source changes
const merge = require('utils-merge'); // Object merge tool
const duration = require('gulp-duration'); // Time aspects of your gulp process
const connect = require('gulp-connect');  // Local server
const sass = require('gulp-sass'); // Compile sass
const spritesmith = require('gulp.spritesmith');  // Sprite generator
const sassGlob = require('gulp-sass-glob'); // Global sass injector

// Configuration for Gulp
let config = {
	js: {
		src: './src/main.js',
		watch: './src/**/*.js',
		outputDir: './dist',
		outputFile: 'build.js',
	},
	scss: {
		src: './src/scss/main.scss',
		watch: './src/**/*.scss',
		outputDir: './dist',
		outputFile: 'build.css'
	},
	sprite: {
		src: './src/images/sprites/*.png',
		retina: './src/images/sprites/*@2x.png',
		outputDir: './dist/'
	}
};

// Error reporting function
let mapError = (err) => {
	if (err.fileName) {
		// Regular error
		gutil.log(chalk.red(err.name)
			+ ': ' + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
			+ ': ' + 'Line ' + chalk.magenta(err.lineNumber)
			+ ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column)
			+ ': ' + chalk.blue(err.description));
	} else {
		// Browserify error..
		gutil.log(chalk.red(err.name)
			+ ': '
			+ chalk.yellow(err.message));
	}
}

// Completes the final file outputs
let bundle = (bundler) => {
	let bundleTimer = duration('Javascript bundle time');
	bundler
		.bundle()
		// Map error reporting
		.on('error', mapError)
		// Set source name
		.pipe(source('main.jsx'))
		// Convert to gulp pipeline
		.pipe(buffer())
		// Rename the output file
		.pipe(rename(config.js.outputFile))
		// Extract the inline sourcemaps
		.pipe(sourcemaps.init({loadMaps: true}))
		// Set folder for sourcemaps to output to
		.pipe(sourcemaps.write('./map'))
		// Set the output folder
		.pipe(gulp.dest(config.js.outputDir))
		// Output the file being created
		.pipe(notify({
			message: 'Generated file: <%= file.relative %>',
		}))
		// Output time timing of the file creation
		.pipe(bundleTimer)
		// Reload the view in the browser
		.pipe(connect.reload());
}

// Build sass files
gulp.task('sass', ['sprite'], () => {
	return gulp.src(config.scss.src)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sassGlob())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('./map'))
		.pipe(gulp.dest(config.scss.outputDir));
});

// Extras
gulp.task('extras', () => {
	gulp.src(['!src/components/**/',
		'!src/components/',
		'!src/scss/',
		'!src/scss/**',
		'!src/index.html',
		'!src/main.js',
		'!src/images/sprites/**',
		'!src/images/sprites/',
		'src/**/*'])
		.pipe(gulp.dest('dist'))
});

// Make sprite
gulp.task('sprite', () => {
		// Use all normal and `-2x` (retina) images as `src`
		let spriteData = gulp.src(config.sprite.src)
			.pipe(spritesmith({
				// Filter out `-2x` (retina) images to separate spritesheet
				retinaSrcFilter: config.sprite.retina,
				// Generate a normal and a `-2x` (retina) spritesheet
				imgName: 'images/sprites/spritesheet.png',
				retinaImgName: 'images/sprites/spritesheet-2x.png',
				// Generate SCSS variables/mixins for both spritesheets
				cssName: '_sprites.scss'
			}));
		// Deliver spritesheets to `dist/` folder as they are completed
		spriteData.img.pipe(gulp.dest(config.sprite.outputDir));
		// Deliver CSS to `./` to be imported by `index.scss`
		spriteData.css.pipe(gulp.dest('./src/scss/'));
	}
);

gulp.task('html', () => {
	gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

// Localhost task
gulp.task('connect', () => {
	connect.server({
		root: 'dist',
		livereload: true
	});
});

// Gulp task for build
gulp.task('default', ['sass', 'connect', 'extras','html'], () => {

	// Merge in default watchify args with browserify arguments
	let args = merge(watchify.args, {debug: true});
	// Browserify
	let bundler = browserify(config.js.src, args)
	// Watchify to watch source file changes
		.plugin(watchify, {ignoreWatch: ['**/node_modules/**', '**/bower_components/**']})
		// Babel transforms
		.transform(babelify, {presets: ['es2015', 'react']});
	// Run the bundle the first time (required for Watchify to kick in)
	bundle(bundler);
	bundler.on('update', () => {
		// Re-run bundle on source updates
		bundle(bundler);
	});
	// Watch sass file changes
	gulp.watch(config.scss.watch, ['sass']);
	// Watch sprite images changes
	gulp.watch(config.sprite.src, ['sprite']);
	gulp.watch('src/*.html', ['html']);
});
