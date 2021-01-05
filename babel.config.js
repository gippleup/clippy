module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      root: ["."],
      extensions: [".js", ".jsx", ".ts", ".tsx", ".ios.js", ".android.js", ".json"],
      alias: {
        "src": "./src",
        "@api": "./src/api",
        "@colortheme": "./src/colortheme",
        "@components": "./src/components",
        "@hooks": "./src/hooks",
        "@redux": "./src/redux",
        "@router": "./src/router",
        "@screens": "./src/screens",
        "@types": "./src/types",
        "@utils": "./src/utils",
      }
    }]
  ]
};
