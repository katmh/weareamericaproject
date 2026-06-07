const babelOptions = {
  presets: ["babel-preset-gatsby", "@babel/preset-typescript"],
};

const babelJest = require("babel-jest");

module.exports = (babelJest.default || babelJest).createTransformer(babelOptions);
