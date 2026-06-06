const babelOptions = {
  presets: ["babel-preset-gatsby"],
};

const babelJest = require("babel-jest");

module.exports = (babelJest.default || babelJest).createTransformer(babelOptions);
