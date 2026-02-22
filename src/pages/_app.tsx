import WalletProvider from "@contexts/WalletProvider";
import type { AppType } from "next/dist/shared/lib/utils";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  );
};

export default MyApp;
