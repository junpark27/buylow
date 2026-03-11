"use client";

import { usePrivy } from "@privy-io/react-auth";

export default function AuthButton() {
  const { ready, authenticated, login, logout, user } = usePrivy();

  if (!ready) {
    return (
      <div className="h-8 w-16 animate-pulse rounded-lg bg-dark-border" />
    );
  }

  if (authenticated) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-xs text-dark-muted">
          {user?.email?.address ||
            (user?.wallet?.address
              ? user.wallet.address.slice(0, 6) + "..."
              : "User")}
        </span>
        <button
          onClick={logout}
          className="rounded-lg border border-dark-border px-3 py-1.5 text-xs text-dark-muted transition-colors hover:border-white hover:text-white"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={login}
      className="rounded-lg border border-dark-border px-4 py-2 text-xs text-dark-muted transition-colors hover:border-white hover:text-white"
    >
      Log in
    </button>
  );
}
