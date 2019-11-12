# Configuration

The default configuration covers most use cases. However, `.aofl.js` can be used to customize your application with additional configs.

Each section shows the available options and their default values.

## name
Name of the project. This shows during build.

```javascript
name: 'AofL JS App'
```

---
## root
Defaults to project's root directory and should only be overwritten if the config file isn't located in the project's root directory.

```js
root: 'path/to/directory/containing(.aofl.js)'
```
---
## type
Defaults to project. 'stand-alone' mode can be used to build stand alone components.

```js
type: 'project|stand-alone' // defaults to project
```
---
## build

```js
build: {
  filename: '[name]-[chunkhash].js', // https://webpack.js.org/configuration/output/#outputfilename
  path: 'project-root/__build', // https://webpack.js.org/configuration/output/#outputpath
  publicPath: '/', // https://webpack.js.org/configuration/output/#outputpublicpath
  devtool: 'eval', // or source-map when NODE_ENV=development https://webpack.js.org/configuration/devtool/
  cache: true, // Enable/disable cache for loaders
  target: 'web', // https://webpack.js.org/configuration/target/
  entry: { // values defined in config will be appended to this list. Use entryReplace to replace this list.
    'custom-elements-es5-adapter': resources.CUSTOM_ELEMENTS_ES5_ADAPTER,
    'main': path.resolve(root, 'src', 'modules', 'index.js')
  },
  entryReplace: {}, // https://webpack.js.org/configuration/entry-context/#entry
  css: { // rules for css modules (configure loaders, parser options, etc.) https://webpack.js.org/configuration/
    test: /\.css$/',
    include: [path.join(root, 'src'), path.join(root, 'node_modules', '@aofl', 'unit-testing'), path.join(root, 'node_modules', '@aofl', 'cli', 'commands', 'test-project')],
    exclude: [],
    issuer: {},
    enforce: '',
    global: { // https://www.npmjs.com/package/@aofl/html-webpack-purify-internal-css-plugin
      level: process.env.NODE_ENV === 'development'? 'none': 'auto', // all, none, auto
      purgeCss: { // https://www.purgecss.com/configuration
        whitelist: ['route-view'],
        whitelistPatterns: undefined,
        keyframes: undefined,
        fontFace: undefined,
        rejected: undefined
      },
    },
    cssLoader: {}, // https://www.npmjs.com/package/css-loader
    postCssLoader: { // https://www.npmjs.com/package/postcss-loader
      plugins: [
        autoprefixer(),
        cssnano(),
      ],
    },
    replace: { // override include, exclude patterns
      include: [],
      exclude: []
    }
  },
  images: {  // rules for images modules (configure loaders, parser options, etc.) https://webpack.js.org/configuration/
    test: /\.(png|jpe?g|gif|svg)$/',
    include: [path.join(root, 'src')],
    exclude: [],
    issuer: {}',
    enforce: '',
    fileLoader: {},// https://www.npmjs.com/package/file-loader
    imgLoader: { // https://www.npmjs.com/package/img-loader
      plugins: process.env.NODE_ENV === 'production' && [
        require('imagemin-gifsicle')(),
        require('imagemin-mozjpeg')({
          quality: 90,
        }),
        require('imagemin-optipng')(),
        require('imagemin-svgo')(),
      ]
    },
    replace: { // override include, exclude patterns
      include: [],
      exclude: []
    }
  },
  fonts: { // rules for fonts modules (configure loaders, parser options, etc.) https://webpack.js.org/configuration/
    test: /\.(woff2?|ttf|eot|svg#.*)$/,
    include: [path.join(root, 'src')],
    exclude: [],
    issuer: {}',
    enforce: '',
    fileLoader: { // https://www.npmjs.com/package/file-loader
      name: process.env.NODE_ENV === environments.PRODUCTION ? '[hash:7].[ext]': '[name].[ext]'
    },
    replace: { // override include, exclude patterns
      include: [],
      exclude: []
    }
  },
  eslint: { // rules for eslint modules (configure loaders, parser options, etc.) https://webpack.js.org/configuration/
    test: /\.js$/,
    include: [path.join(root, 'src')],
    exclude: [],    issuer: {}',
    enforce: 'pre',
    options: {
      config: path.join(__dirname, '.eslintrc.js')
    },
    replace: { // override include, exclude patterns
      include: [],
      exclude: []
    }
  }, // eslint-loader options or false
  js: { // rules for js modules (configure loaders, parser options, etc.) https://webpack.js.org/configuration/
    test: /\.js$/,
    include: [
      path.join(root, 'src'),
      path.join(root, 'node_modules', '@aofl', 'unit-testing'),
      path.join(root, 'node_modules', '@aofl', 'polyfill-service'),
      path.join(root, 'node_modules', 'lit-element'),
      path.join(root, 'node_modules', 'lit-html'),
      path.join(root, 'node_modules', 'chai'),
      path.join(root, 'node_modules', 'chai-as-promised'),
      path.join(root, 'node_modules', '@aofl', 'cli', 'commands', 'test-project'),
      path.join(root, 'node_modules', '@webcomponents')
    ],
    exclude: [],
    issuer: {}',
    enforce: '',
    babel: { // https://www.npmjs.com/package/babel-loader
      cacheDirectory: true,
      ...require(path.join(__dirname, '.babelrc.js')), // babel config
    },
    replace: { // override include, exclude patterns
      include: [],
      exclude: []
    }
  },
  templating: { // https://www.npmjs.com/package/@aofl/templating-plugin
    template: {
      name: 'main',
      template: path.resolve(root, 'src', 'template', 'template.ejs'),
      filename: path.join('template', 'template.html'),
      ...htmlWebpackconfig(process.env.NODE_ENV),
    },
    routes: {
      mainRoutes: path.join(root, 'src', 'routes'),
      pattern: [path.join('src', 'routes', '**', 'index.js')],
      ignore: ['**/__build/**/*', '**/node_modules/**/*'],
    },
    loaderOptions: {
      path: path.join(root, 'src', 'modules', '__config', 'routes.js'),
    }
  },
  terser: { // https://www.npmjs.com/package/terser-webpack-plugin
    parallel: true,
    sourceMap: true,
    extractComments: true,
  },
  serviceworker: { // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
    swSrc: path.join(__dirname, 'sw.js'),
    swDest: 'sw.js',
    exclude: [/\.LICENSE$/, /\.map\.js$/]
  },
  favicon: { // https://www.npmjs.com/package/copy-webpack-plugin
    from: 'assets/favicon.ico',
    to: 'favicon.ico',
  },
  pwaManifest: { // https://www.npmjs.com/package/webpack-pwa-manifest
    'name': 'Aofl Starter App',
    'short_name': 'AoflStarter',
    'description': 'Aofl Starter App',
    'display': 'standalone',
    'theme-color': '#fdf667',
    'background_color': '#fdf667',
    'crossorigin': 'use-credentials', // can be null, use-credentials or anonymous
    'ios': {
      'apple-mobile-web-app-title': 'Aofl Starter App',
      'apple-mobile-web-app-status-bar-style': '#fdf667',
    },
    'icons': [
      {
        src: 'src/assets/manifest/icon-48x48.png',
        sizes: '48x48',
      },
      {
        src: 'src/assets/manifest/icon-72x72.png',
        sizes: '72x72',
      },
      {
        src: 'src/assets/manifest/icon-96x96.png',
        sizes: '96x96',
      },
      {
        src: 'src/assets/manifest/icon-144x144.png',
        sizes: '144x144',
      },
      {
        src: 'src/assets/manifest/icon-192x192.png',
        sizes: '192x192',
      },
      {
        src: 'src/assets/manifest/icon-512x512.png',
        sizes: '512x512',
      },
    ],
  },
  extend: () => {} // can be used to modify webpack config
}
```

---
## devServer
Visit [`webpack-dev-server` config](https://webpack.js.org/configuration/dev-server/) for the full set of features.
```js
devServer: {
  contentBase: path.join(root, '__build'),
  port: 8080,
  host: 'localhost',
  openPage: '',
  open: true,
  stats: 'minimal',
  historyApiFallback: true,
}
```
---
## unitTesting

```js
unitTesting: {
  root,
  output: '__build_tests',
  publicPath: '/__build_tests/',
  config: path.join(root, '.wctrc.json'),
  maxChunks: 1,
  polyfill: path.join(root, 'src', 'modules', '__config', 'polyfills.js'),
  include: ['src/**/*.spec.js'],
  exclude: [
    '**/__build*',
    '**/node_modules',
    '**/node_modules_sourced',
    '**/documentation{,!(/tests/**)}',
    '**/__config',
    '**/*-instance/**',
    '**/*-polyfill/**',
    'sw.js',
    'coverage'
  ]
}
```