import type { AppProps /*, AppContext */ } from "next/app";
import style from "./global.module.scss";
import "./globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={style.app}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
