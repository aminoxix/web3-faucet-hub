import DashboardLayout from "@components/DashboardLayout";
import { useWalletContext } from "@contexts/WalletProvider";
import { ethers } from "ethers";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Send: NextPage = () => {
  const { wallet } = useWalletContext();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [sending, setSending] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!wallet || !recipient || !amount) return;

    setError(null);
    setTxHash(null);
    setSending(true);

    try {
      const provider = new ethers.providers.Web3Provider(
        wallet.provider,
        "any",
      );
      const signer = provider.getSigner();
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.utils.parseEther(amount),
      });
      setTxHash(tx.hash);
      setRecipient("");
      setAmount("");
    } catch (err: any) {
      setError(err?.message ?? "Transaction failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Head>
        <title>Faucet Hub - Send</title>
      </Head>

      <DashboardLayout>
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold mb-2">
            <span className="gradient-text">Send</span>
          </h1>
          <p className="text-sm text-white/40">
            Send testnet tokens to another address
          </p>
        </div>

        <div className="max-w-lg animate-slide-up">
          <div className="glass p-8 space-y-5">
            {/* Recipient */}
            <div>
              <label className="text-xs font-medium text-white/40 mb-2 block">
                Recipient Address
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/30 focus:bg-white/[0.05] transition-all duration-200"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="text-xs font-medium text-white/40 mb-2 block">
                Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.001"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 pr-16 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/30 focus:bg-white/[0.05] transition-all duration-200"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-white/30">
                  ETH
                </span>
              </div>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={sending || !recipient || !amount}
              className="btn-primary w-full flex items-center justify-center gap-2.5"
            >
              {sending ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
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
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                  Send Transaction
                </>
              )}
            </button>

            {/* Success */}
            {txHash && (
              <div className="bg-emerald-500/[0.06] border border-emerald-500/[0.12] rounded-xl p-4">
                <div className="flex gap-3">
                  <svg
                    className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <div>
                    <p className="text-xs font-medium text-emerald-400 mb-1">
                      Transaction Sent
                    </p>
                    <p className="text-[11px] text-white/30 font-mono break-all">
                      {txHash}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-500/[0.06] border border-red-500/[0.12] rounded-xl p-4">
                <div className="flex gap-3">
                  <svg
                    className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <p className="text-xs text-red-400/80">{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Send;
