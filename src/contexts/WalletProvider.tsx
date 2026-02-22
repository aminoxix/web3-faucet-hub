import { useRouter } from "next/router";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ConnectOptions, WalletState } from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import { init, useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";

const injected = injectedModule();

init({
  wallets: [injected],
  chains: [
    {
      id: "0xaa36a7",
      token: "ETH",
      label: "Ethereum Sepolia",
      rpcUrl: "https://rpc.sepolia.org",
    },
    {
      id: "0x4268",
      token: "ETH",
      label: "Ethereum Holesky",
      rpcUrl: "https://rpc.holesky.ethpandaops.io",
    },
    {
      id: "0x13882",
      token: "POL",
      label: "Polygon Amoy",
      rpcUrl: "https://rpc-amoy.polygon.technology",
    },
    {
      id: "0x66eee",
      token: "ETH",
      label: "Arbitrum Sepolia",
      rpcUrl: "https://sepolia-rollup.arbitrum.io/rpc",
    },
    {
      id: "0xaa37dc",
      token: "ETH",
      label: "Optimism Sepolia",
      rpcUrl: "https://sepolia.optimism.io",
    },
    {
      id: "0x14a34",
      token: "ETH",
      label: "Base Sepolia",
      rpcUrl: "https://sepolia.base.org",
    },
    {
      id: "0xa869",
      token: "AVAX",
      label: "Avalanche Fuji",
      rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
    },
    {
      id: "0x61",
      token: "tBNB",
      label: "BNB Chain Testnet",
      rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    },
  ],
  appMetadata: {
    name: "Web3 Faucet Hub",
    icon: "<svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'><path d='M12 2L2 7l10 5 10-5-10-5Z'/><path d='m2 17 10 5 10-5'/><path d='m2 12 10 5 10-5'/></svg>",
    description: "Collect testnet tokens from all major faucets",
  },
  accountCenter: {
    desktop: { enabled: false },
    mobile: { enabled: false },
  },
});

export interface IWalletContext {
  isLoggedIn: boolean;
  wallet: WalletState | null;
  address: string | null;
  login: (options?: ConnectOptions) => Promise<void>;
  connecting: boolean;
  logout: () => void;
}

export const WalletContext = createContext({} as IWalletContext);

const WalletProvider = (props: PropsWithChildren) => {
  const router = useRouter();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const address = useMemo(() => {
    if (wallet?.accounts?.[0]?.address) {
      return wallet.accounts[0].address;
    }
    return null;
  }, [wallet]);

  useEffect(() => {
    setIsLoggedIn(!!wallet);
  }, [wallet]);

  useEffect(() => {
    router.push(isLoggedIn ? "/dashboard" : "/");
  }, [isLoggedIn]);

  let ethersProvider: ethers.providers.Web3Provider | undefined;
  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, "any");
  }

  return (
    <WalletContext.Provider
      value={{
        isLoggedIn,
        wallet,
        address,
        login: async (arg) => {
          await connect(arg);
        },
        connecting,
        logout: async () => {
          if (!wallet) return;
          await disconnect(wallet);
        },
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
export const useWalletContext = () => React.useContext(WalletContext);
