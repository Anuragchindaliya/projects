import AudioController from "@/components/audio/AudioController";
import { SoundProvider } from "@/components/audio/SoundContext";
import PageTransition from "@/components/layout/PageTransition";
import { DevToolsSecret } from "@/components/ui/dev-tools-secret";
import { ThemeColorProvider } from "@/components/ui/theme-color-provider";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeColorProvider>
      <SoundProvider>
        <NextNProgress />
        {/* <LayoutGroup> */}
        {useRouter().pathname.startsWith("/v2") ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <PageTransition>
              <Component {...pageProps} />
            </PageTransition>
          </Layout>
        )}
        {/* <ThemeSwitcher /> */}
        <AudioController />
        <DevToolsSecret />
        {/* </LayoutGroup> */}
      </SoundProvider>
    </ThemeColorProvider>
  );
}

export default MyApp;
