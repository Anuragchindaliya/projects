import { ThemeColorProvider } from "@/components/ui/theme-color-provider";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeColorProvider>
      <NextNProgress />
      {/* <LayoutGroup> */}
      {useRouter().pathname.startsWith("/v2") ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
      <ThemeSwitcher />
      {/* </LayoutGroup> */}
    </ThemeColorProvider>
  );
}

export default MyApp;
