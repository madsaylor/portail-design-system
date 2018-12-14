module.exports = {
  baseUrl: process.env.npm_lifecycle_event === 'build-demo'
    ? '/portail-design-system/'
    : '/'
}
