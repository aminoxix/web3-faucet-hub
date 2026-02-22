import { useWalletContext } from "@contexts/WalletProvider";
import type { NextPage } from "next";
import Head from "next/head";

const WalletConnect: NextPage = () => {
  const { login, connecting } = useWalletContext();

  return (
    <>
      <Head>
        <title>Faucet Hub - Connect Wallet</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Orbs */}
        <div className="orb orb-violet w-[500px] h-[500px] -top-40 -left-40 animate-float" />
        <div className="orb orb-indigo w-[400px] h-[400px] -bottom-32 -right-32 animate-float-delayed" />
        <div className="orb orb-purple w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Card */}
        <div className="relative z-10 w-full max-w-md mx-4 animate-fade-in">
          <div className="glass p-10 text-center space-y-8">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-violet-500/30 animate-float">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5Z" />
                  <path d="m2 17 10 5 10-5" />
                  <path d="m2 12 10 5 10-5" />
                </svg>
              </div>
            </div>

            {/* Text */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold">
                <span className="gradient-text">Faucet Hub</span>
              </h1>
              <p className="text-sm text-white/40 leading-relaxed max-w-xs mx-auto">
                Connect your wallet to access testnet faucets for all major
                blockchain networks
              </p>
            </div>

            {/* Connect Button */}
            <button
              onClick={() => login()}
              disabled={connecting}
              className="btn-primary w-full py-4 text-base flex items-center justify-center gap-3"
            >
              {connecting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
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
                  Connecting...
                </>
              ) : (
                <>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <path d="M22 10H2" />
                    <path d="M6 14h.01" />
                  </svg>
                  Connect Wallet
                </>
              )}
            </button>

            {/* Footer hint */}
            <p className="text-[11px] text-white/20">
              Supports MetaMask, WalletConnect & more
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletConnect;
