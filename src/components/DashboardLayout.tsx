import { useWalletContext } from "@contexts/WalletProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren, useState } from "react";

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

const NAV_ITEMS = [
  {
    href: "/dashboard",
    label: "Faucets",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    href: "/dashboard/deposit",
    label: "Deposit",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3v18" />
        <path d="m6 15 6 6 6-6" />
      </svg>
    ),
  },
  {
    href: "/dashboard/send",
    label: "Send",
    icon: (
      <svg
        width="18"
        height="18"
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
    ),
  },
];

export default function DashboardLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const { address, connecting, logout } = useWalletContext();
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 border-r border-white/[0.06] bg-dark-950/80 backdrop-blur-xl flex flex-col z-50">
        {/* Logo */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5Z" />
                <path d="m2 17 10 5 10-5" />
                <path d="m2 12 10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">Faucet Hub</h1>
              <p className="text-[10px] text-white/30 font-medium">
                Testnet Tokens
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <a className={isActive ? "nav-link-active" : "nav-link"}>
                  {item.icon}
                  {item.label}
                </a>
              </Link>
            );
          })}
        </nav>

        {/* Bottom: Address & Logout */}
        <div className="p-4 space-y-3 border-t border-white/[0.06]">
          {address && (
            <button
              onClick={copyAddress}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] transition-all duration-200 group"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-xs font-medium text-white/80 truncate">
                  {truncateAddress(address)}
                </p>
                <p className="text-[10px] text-white/30">
                  {copied ? "Copied!" : "Click to copy"}
                </p>
              </div>
              <svg
                className="w-3.5 h-3.5 text-white/20 group-hover:text-white/40 transition-colors ml-auto flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          )}
          <button
            onClick={logout}
            disabled={connecting}
            className="w-full btn-ghost text-xs text-white/40 hover:text-red-400 hover:bg-red-500/[0.06] flex items-center justify-center gap-2"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Disconnect
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        <div className="max-w-6xl mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}
