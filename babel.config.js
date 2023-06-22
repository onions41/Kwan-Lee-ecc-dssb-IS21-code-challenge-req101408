module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "18.15.0"
        },
        exclude: ["proposal-dynamic-import"] // https://stackoverflow.com/questions/63563485/how-can-i-preserve-dynamic-import-statements-with-babel-preset-env
      }
    ]
  ]
}
