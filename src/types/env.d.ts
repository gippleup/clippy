declare module "react-native-config" {
  interface Config {
    ENV: "DEV" | "PRODUCTION";
    NYTIMES_API_KEY: string;
  }

  const BuildConfig: Config
  export default BuildConfig;
}