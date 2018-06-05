module.exports = {
  entry: './index.js',
  watch: true,
  mode: 'development',
  watchOptions: {
    ignored: '/node_modules/'
  },
  output: {
    filename: 'bundle.js'
  }
}