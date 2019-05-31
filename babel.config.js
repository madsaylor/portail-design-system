module.exports = {
  presets: ['@vue/app'],
  overrides: [
    {
      test: ['./node_modules/vue2-dropzone'],
      presets: [
        ['@babel/preset-env', {	targets: { ie: '11' } }],
      ],
    }],
};
