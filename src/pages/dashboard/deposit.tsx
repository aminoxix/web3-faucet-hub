import DashboardLayout from "@components/DashboardLayout";
import { useWalletContext } from "@contexts/WalletProvider";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

const Deposit: NextPage = () => {
  const { address } = useWalletContext();
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Head>
        <title>Faucet Hub - Deposit</title>
      </Head>

      <DashboardLayout>
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold mb-2">
            <span className="gradient-text">Deposit</span>
          </h1>
          <p className="text-sm text-white/40">
            Receive tokens by sharing your wallet address
          </p>
        </div>

        <div className="max-w-lg animate-slide-up">
          <div className="glass p-8 space-y-6">
            {/* Address display */}
            <div>
              <label className="text-xs font-medium text-white/40 mb-3 block">
                Your Wallet Address
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5">
                  <p className="text-sm font-mono text-white/70 break-all">
                    {address ?? "Not connected"}
                  </p>
                </div>
              </div>
            </div>

            {/* Copy button */}
            <button
              onClick={copyAddress}
              disabled={!address}
              className="btn-primary w-full flex items-center justify-center gap-2.5"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              {copied ? "Copied!" : "Copy Address"}
            </button>

            {/* Info */}
            <div className="bg-violet-500/[0.06] border border-violet-500/[0.1] rounded-xl p-4">
              <div className="flex gap-3">
                <svg
                  className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <p className="text-xs text-white/40 leading-relaxed">
                  Share this address to receive testnet tokens. Make sure the
                  sender is on the correct testnet network before sending.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Deposit;
