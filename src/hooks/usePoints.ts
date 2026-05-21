"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";

const BALANCE_KEY = "gx_balance";
const CREDITED_KEY = "gx_credited_ids";

export function usePoints() {
  const { user, loading: authLoading } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (authLoading) return;

    if (user) {
      // Fetch balance from server API (bypasses RLS issues)
      fetch("/api/points/balance")
        .then(r => r.json())
        .then(d => setBalance(d.balance ?? 0))
        .catch(() => setBalance(0));
    } else {
      // Guest: localStorage
      const stored = localStorage.getItem(BALANCE_KEY);
      setBalance(stored !== null ? parseInt(stored, 10) || 0 : 0);
    }
  }, [user, authLoading]);

  const creditPoints = useCallback(async (pts: number, refId: string): Promise<boolean> => {
    if (user) {
      try {
        const res = await fetch("/api/points/credit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pts, refId }),
        });
        const data = await res.json();
        if (typeof data.balance === "number") setBalance(data.balance);
        return true;
      } catch {
        return false;
      }
    }

    // Guest: localStorage with idempotency
    const raw = localStorage.getItem(CREDITED_KEY);
    const credited: string[] = raw ? JSON.parse(raw) : [];
    if (credited.includes(refId)) return false;

    const current = parseInt(localStorage.getItem(BALANCE_KEY) ?? "0", 10) || 0;
    const next = current + pts;
    localStorage.setItem(BALANCE_KEY, String(next));
    localStorage.setItem(CREDITED_KEY, JSON.stringify([...credited, refId]));
    setBalance(next);
    return true;
  }, [user]);

  return { balance, creditPoints };
}
