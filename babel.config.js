module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      root: ["."],
      extensions: [".js", ".jsx", ".ts", ".tsx", ".ios.js", ".android.js", ".json"],
      alias: {
        "src": "./src",
        "@components": "./src/components",
        "@redux": "./src/redux",
        "@router": "./src/router",
        "@screens": "./src/screens",
        "@utils": "./src/utils",
        "@types": "./src/types",
      }
    }]
  ]
};
