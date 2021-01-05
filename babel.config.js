module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      root: ["."],
      extensions: [".js", ".jsx", ".ts", ".tsx", ".ios.js", ".android.js", ".json"],
      alias: {
        "src": "./src",
        "@api": "./src/api",
        "@components": "./src/components",
        "@hooks": "./src/hooks",
        "@navigation": "./src/navigation",
        "@redux": "./src/redux",
        "@screens": "./src/screens",
        "@styled": "./src/styled",
        "@types": "./src/types",
        "@utils": "./src/utils",
      }
    }]
  ]
};
