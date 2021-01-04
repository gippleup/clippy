declare module "react-native-config" {
  interface Config {
    ENV: "DEV" | "PRODUCTION";
  }

  const BuildConfig: Config
  export default BuildConfig;
}