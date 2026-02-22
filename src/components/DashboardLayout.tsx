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
    <div className="sidebar-wrapper min-h-screen flex">
      {/* Hidden checkbox — drives sidebar collapse via CSS :has() */}
      <input type="checkbox" id="sidebar-toggle" className="hidden" />

      {/* Sidebar */}
      <aside className="sidebar fixed top-0 left-0 h-full w-64 border-r border-white/[0.06] bg-dark-950/80 backdrop-blur-xl flex flex-col z-50 transition-all duration-300 ease-in-out">
        {/* Logo */}
        <div className="sidebar-logo p-4 px-4">
          <div className="sidebar-logo-inner flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20 flex-shrink-0">
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
            <div className="sidebar-text">
              <h1 className="text-sm font-bold text-white">Faucet Hub</h1>
              <p className="text-[10px] text-white/30 font-medium">
                Testnet Tokens
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <div key={item.href} className="relative group">
                <Link href={item.href}>
                  <a
                    className={`${isActive ? "nav-link-active" : "nav-link"} overflow-hidden`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className="sidebar-text">{item.label}</span>
                  </a>
                </Link>
                <span className="sidebar-tooltip">{item.label}</span>
              </div>
            );
          })}
        </nav>

        {/* Bottom: Address & Logout */}
        <div className="sidebar-bottom flex flex-col space-y-2 border-t border-white/[0.06] p-3">
          {address && (
            <div className="relative group w-full">
              <button
                onClick={copyAddress}
                className="sidebar-btn w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] transition-all duration-300 overflow-hidden"
              >
                <div className="sidebar-dot w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="sidebar-text flex items-center gap-2">
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
                </div>
              </button>
              <span className="sidebar-tooltip">
                {copied ? "Copied!" : truncateAddress(address)}
              </span>
            </div>
          )}

          {/* Disconnect */}
          <div className="relative group w-full">
            <button
              onClick={logout}
              disabled={connecting}
              className="sidebar-btn w-full flex items-center justify-center gap-2 rounded-xl text-xs text-white/40 hover:text-red-400 hover:bg-red-500/[0.06] px-4 py-2 transition-all duration-300 overflow-hidden"
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
                className="flex-shrink-0"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="sidebar-text">Disconnect</span>
            </button>
            <span className="sidebar-tooltip">Disconnect</span>
          </div>
        </div>
      </aside>

      {/* Toggle — label toggles the hidden checkbox, hidden on mobile via CSS */}
      <label
        htmlFor="sidebar-toggle"
        className="toggle-btn fixed z-[51] top-5 left-[242px] w-7 h-7 rounded-full bg-dark-900 border border-white/[0.1] items-center justify-center text-white/40 hover:text-white hover:bg-violet-600 hover:border-violet-500 transition-all duration-300 ease-in-out shadow-lg shadow-black/30 cursor-pointer hidden md:flex"
      >
        <svg
          className="toggle-chevron"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </label>

      {/* Main Content */}
      <main className="flex-1 min-h-screen ml-64 transition-all duration-300 ease-in-out">
        <div className="max-w-6xl mx-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
