const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Automatically find pages with src/js/scripts.js
function getPages() {
  const root = __dirname;
  const pages = [];

  // Root page
  if (fs.existsSync(path.join(root, 'src/js/scripts.js'))) {
    pages.push({
      name: 'main',
      dir: '', // root
      entry: './src/js/scripts.js',
      scss: './src/scss/main.scss',
      fonts: './src/fonts'
    });
  }

  // Subpages
  fs.readdirSync(root, {withFileTypes: true})
    .filter(dir => dir.isDirectory() && !['dist', 'node_modules'].includes(dir.name))
    .forEach(dir => {
      const jsPath = path.join(root, dir.name, 'src/js/scripts.js');
      if (fs.existsSync(jsPath)) {
        pages.push({
          name: dir.name,
          dir: dir.name,
          entry: `./${dir.name}/src/js/scripts.js`,
          scss: `./${dir.name}/src/scss/main.scss`,
          fonts: `./${dir.name}/src/fonts`
        });
      }
    });

  return pages;
}

const pages = getPages();

// To print issues at the end of terminal for last developing project. Added after change logic of naming projects
pages.reverse();

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return pages.map(page => ({
    name: page.name,
    mode: isProd ? 'production' : 'development',
    entry: [
      path.resolve(__dirname, page.entry),
      path.resolve(__dirname, page.scss)
    ],
    output: {
      filename: 'bundle.min.js',
      path: path.resolve(__dirname, page.dir ? `${page.dir}/dist` : 'dist'),
      clean: true,
    },
    devtool: isProd ? false : 'source-map',
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                api: 'modern',
              },
            },
          ],
        },
        {
          test: /\.(woff2?|ttf|otf|eot)$/,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]' // relative to page dist folder
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'bundle.min.css', // inside page's dist
      }),
    ],
    watch: !isProd,
    performance: {
      hints: 'warning', // If any file is too big, - show yellow warning in terminal (do not fail the build)
      maxAssetSize: 400000, // (default 250 KiB). Prevents warning due to size of file InterVariable.woff2 in project
    },
    stats: 'errors-warnings', // To see less success outputs in terminal and full report of issues
  }));
};
