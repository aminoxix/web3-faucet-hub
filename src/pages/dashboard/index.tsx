import DashboardLayout from "@components/DashboardLayout";
import { useWalletContext } from "@contexts/WalletProvider";
import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";

// Coin SVG icon for the collect button
const CoinIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

interface Faucet {
  name: string;
  symbol: string;
  network: string;
  faucetUrl: string;
  gradient: string;
  letter: string;
  letterColor: string;
  letterBg: string;
}

const FAUCETS: Faucet[] = [
  {
    name: "Ethereum",
    symbol: "ETH",
    network: "Sepolia",
    faucetUrl:
      "https://cloud.google.com/application/web3/faucet/ethereum/sepolia",
    gradient: "from-blue-500/20 to-blue-600/20",
    letter: "E",
    letterColor: "text-blue-400",
    letterBg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    network: "Holesky",
    faucetUrl:
      "https://cloud.google.com/application/web3/faucet/ethereum/holesky",
    gradient: "from-cyan-500/20 to-cyan-600/20",
    letter: "E",
    letterColor: "text-cyan-400",
    letterBg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    name: "Polygon",
    symbol: "POL",
    network: "Amoy",
    faucetUrl: "https://faucet.polygon.technology/",
    gradient: "from-purple-500/20 to-purple-600/20",
    letter: "P",
    letterColor: "text-purple-400",
    letterBg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    name: "Arbitrum",
    symbol: "ETH",
    network: "Sepolia",
    faucetUrl: "https://www.alchemy.com/faucets/arbitrum-sepolia",
    gradient: "from-sky-500/20 to-sky-600/20",
    letter: "A",
    letterColor: "text-sky-400",
    letterBg: "bg-sky-500/10 border-sky-500/20",
  },
  {
    name: "Optimism",
    symbol: "ETH",
    network: "Sepolia",
    faucetUrl: "https://www.alchemy.com/faucets/optimism-sepolia",
    gradient: "from-red-500/20 to-red-600/20",
    letter: "O",
    letterColor: "text-red-400",
    letterBg: "bg-red-500/10 border-red-500/20",
  },
  {
    name: "Base",
    symbol: "ETH",
    network: "Sepolia",
    faucetUrl: "https://www.alchemy.com/faucets/base-sepolia",
    gradient: "from-indigo-500/20 to-indigo-600/20",
    letter: "B",
    letterColor: "text-indigo-400",
    letterBg: "bg-indigo-500/10 border-indigo-500/20",
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
    network: "Fuji",
    faucetUrl: "https://core.app/tools/testnet-faucet/?subnet=c&token=c",
    gradient: "from-rose-500/20 to-rose-600/20",
    letter: "A",
    letterColor: "text-rose-400",
    letterBg: "bg-rose-500/10 border-rose-500/20",
  },
  {
    name: "BNB Chain",
    symbol: "tBNB",
    network: "Testnet",
    faucetUrl: "https://www.bnbchain.org/en/testnet-faucet",
    gradient: "from-yellow-500/20 to-yellow-600/20",
    letter: "B",
    letterColor: "text-yellow-400",
    letterBg: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    name: "Fantom",
    symbol: "FTM",
    network: "Testnet",
    faucetUrl: "https://faucet.fantom.network/",
    gradient: "from-blue-400/20 to-blue-500/20",
    letter: "F",
    letterColor: "text-blue-300",
    letterBg: "bg-blue-400/10 border-blue-400/20",
  },
  {
    name: "Linea",
    symbol: "ETH",
    network: "Sepolia",
    faucetUrl: "https://www.infura.io/faucet/linea",
    gradient: "from-emerald-500/20 to-emerald-600/20",
    letter: "L",
    letterColor: "text-emerald-400",
    letterBg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    name: "zkSync",
    symbol: "ETH",
    network: "Sepolia",
    faucetUrl: "https://www.alchemy.com/faucets/zksync-sepolia",
    gradient: "from-violet-500/20 to-violet-600/20",
    letter: "Z",
    letterColor: "text-violet-400",
    letterBg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    name: "Scroll",
    symbol: "ETH",
    network: "Sepolia",
    faucetUrl: "https://scroll.io/bridge",
    gradient: "from-amber-500/20 to-amber-600/20",
    letter: "S",
    letterColor: "text-amber-400",
    letterBg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    name: "Celo",
    symbol: "CELO",
    network: "Alfajores",
    faucetUrl: "https://faucet.celo.org/alfajores",
    gradient: "from-green-500/20 to-green-600/20",
    letter: "C",
    letterColor: "text-green-400",
    letterBg: "bg-green-500/10 border-green-500/20",
  },
  {
    name: "Moonbeam",
    symbol: "DEV",
    network: "Moonbase Alpha",
    faucetUrl: "https://faucet.moonbeam.network/",
    gradient: "from-pink-500/20 to-pink-600/20",
    letter: "M",
    letterColor: "text-pink-400",
    letterBg: "bg-pink-500/10 border-pink-500/20",
  },
  {
    name: "Gnosis",
    symbol: "xDAI",
    network: "Chiado",
    faucetUrl: "https://gnosisfaucet.com/",
    gradient: "from-teal-500/20 to-teal-600/20",
    letter: "G",
    letterColor: "text-teal-400",
    letterBg: "bg-teal-500/10 border-teal-500/20",
  },
  {
    name: "Metis",
    symbol: "tMETIS",
    network: "Sepolia",
    faucetUrl: "https://faucet.metis.io/",
    gradient: "from-cyan-500/20 to-cyan-600/20",
    letter: "M",
    letterColor: "text-cyan-300",
    letterBg: "bg-cyan-400/10 border-cyan-400/20",
  },
];

const Dashboard: NextPage = () => {
  const { address } = useWalletContext();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCollect = useCallback(
    async (faucet: Faucet, index: number) => {
      // Copy address to clipboard so user can paste it on the faucet site
      if (address) {
        try {
          await navigator.clipboard.writeText(address);
          setCopiedIndex(index);
          setTimeout(() => setCopiedIndex(null), 2000);
        } catch {
          // Clipboard API not available, still open the faucet
        }
      }
      // Open faucet in new tab
      window.open(faucet.faucetUrl, "_blank", "noopener,noreferrer");
    },
    [address],
  );

  return (
    <>
      <Head>
        <title>Faucet Hub - Dashboard</title>
      </Head>

      <DashboardLayout>
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold mb-2">
            Testnet <span className="gradient-text">Faucets</span>
          </h1>
          <p className="text-sm text-white/40">
            Collect free testnet tokens. Your address is auto-copied when you
            click collect.
          </p>
        </div>

        {/* Faucet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {FAUCETS.map((faucet, index) => (
            <div
              key={`${faucet.name}-${faucet.network}`}
              className="glass-card p-5 flex flex-col gap-4 animate-slide-up"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {/* Top: Icon + Info */}
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${faucet.letterBg}`}
                >
                  <span className={`text-sm font-bold ${faucet.letterColor}`}>
                    {faucet.letter}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {faucet.name}
                  </h3>
                  <p className="text-xs text-white/30 mt-0.5">
                    {faucet.network}
                  </p>
                </div>
                <span className="ml-auto text-[10px] font-semibold text-white/20 bg-white/[0.04] px-2 py-1 rounded-md flex-shrink-0">
                  {faucet.symbol}
                </span>
              </div>

              {/* Collect Button */}
              <button
                onClick={() => handleCollect(faucet, index)}
                className="btn-collect w-full justify-center"
              >
                <CoinIcon />
                {copiedIndex === index ? (
                  <span className="text-emerald-400">
                    Address Copied! Opening...
                  </span>
                ) : (
                  "Collect"
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center animate-fade-in">
          <p className="text-xs text-white/20">
            Your wallet address is automatically copied to clipboard when
            collecting. Paste it on the faucet site to receive tokens.
          </p>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
