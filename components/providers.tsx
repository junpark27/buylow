"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId="cmmkg2gj402i80cl551ntn4or"
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#f59e0b",
        },
        loginMethods: ["email", "wallet", "google"],
      }}
    >
      {children}
    </PrivyProvider>
  );
}
