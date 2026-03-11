"use client";

import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

interface AdminEntry {
  id: number;
  user_id: string;
  created_at: string;
}

export default function AdminPage() {
  const { user, authenticated, ready, login } = usePrivy();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCount, setAdminCount] = useState<number | null>(null);
  const [admins, setAdmins] = useState<AdminEntry[]>([]);
  const [newUserId, setNewUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const userId = user?.id;

  async function loadAdminInfo() {
    // Check admin count via a quick GET
    const headers: Record<string, string> = {};
    if (userId) headers["x-user-id"] = userId;

    if (userId) {
      const res = await fetch("/api/admin", { headers });
      if (res.ok) {
        const data = await res.json();
        setIsAdmin(data.isAdmin);
        setAdminCount(data.count ?? null);
        setAdmins(data.admins ?? []);
      }
    } else {
      // Check if any admins exist (anonymous check)
      const res = await fetch("/api/admin");
      if (res.ok) {
        const data = await res.json();
        setAdminCount(data.count ?? null);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!ready) return;
    loadAdminInfo();
  }, [ready, userId]);

  async function registerSelfAsFirstAdmin() {
    if (!userId) return;
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "어드민 등록 완료!");
        setIsAdmin(true);
        await loadAdminInfo();
      } else {
        setError(data.error || "등록 실패");
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setSaving(false);
    }
  }

  async function addAdmin() {
    if (!newUserId || !userId) return;
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({ userId: newUserId }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("어드민 추가 완료!");
        setNewUserId("");
        await loadAdminInfo();
      } else {
        setError(data.error || "추가 실패");
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setSaving(false);
    }
  }

  if (!ready || loading) {
    return (
      <main className="mx-auto max-w-2xl px-6 pt-24 pb-16">
        <div className="h-8 w-32 animate-pulse rounded bg-dark-card" />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 pt-24 pb-16">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">
        Admin
      </p>
      <h1 className="mb-8 text-3xl font-extrabold">어드민 설정</h1>

      {message && (
        <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {!authenticated ? (
        <div className="rounded-xl border border-dark-border bg-dark-card p-6 text-center">
          <p className="mb-4 text-dark-muted">어드민 페이지에 접근하려면 로그인이 필요합니다.</p>
          <button
            onClick={login}
            className="rounded-lg bg-gold px-6 py-2.5 text-sm font-bold text-black transition-colors hover:bg-gold-light"
          >
            로그인
          </button>
        </div>
      ) : adminCount === 0 || adminCount === null ? (
        <div className="rounded-xl border border-dark-border bg-dark-card p-6">
          <h2 className="mb-2 text-lg font-bold">첫 어드민 등록</h2>
          <p className="mb-4 text-sm text-dark-muted">
            아직 등록된 어드민이 없습니다. 현재 로그인된 계정을 첫 어드민으로 등록하세요.
          </p>
          <div className="mb-4 rounded-lg bg-dark-border/50 px-4 py-3 font-mono text-xs text-dark-muted">
            {userId}
          </div>
          <button
            onClick={registerSelfAsFirstAdmin}
            disabled={saving}
            className="rounded-lg bg-gold px-6 py-2.5 text-sm font-bold text-black transition-colors hover:bg-gold-light disabled:opacity-50"
          >
            {saving ? "등록 중..." : "첫 어드민으로 등록"}
          </button>
        </div>
      ) : !isAdmin ? (
        <div className="rounded-xl border border-dark-border bg-dark-card p-6 text-center">
          <p className="text-dark-muted">어드민 권한이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-xl border border-dark-border bg-dark-card p-6">
            <h2 className="mb-4 text-lg font-bold">어드민 추가</h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={newUserId}
                onChange={(e) => setNewUserId(e.target.value)}
                placeholder="Privy User ID (did:privy:...)"
                className="flex-1 rounded-lg border border-dark-border bg-dark px-4 py-2.5 font-mono text-sm text-white placeholder-dark-muted focus:border-gold/50 focus:outline-none"
              />
              <button
                onClick={addAdmin}
                disabled={saving || !newUserId}
                className="rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-gold-light disabled:opacity-50"
              >
                추가
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-dark-border bg-dark-card p-6">
            <h2 className="mb-4 text-lg font-bold">내 정보</h2>
            <div className="text-sm text-dark-muted">
              <span className="text-white">User ID:</span>{" "}
              <span className="font-mono text-xs">{userId}</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
