"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useAuth } from "@/context/AuthContext";

const BALANCE_KEY = "gx_balance";
const CREDITED_KEY = "gx_credited_ids";

export function usePoints() {
  const { user, loading: authLoading } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (authLoading) return; // Wait for auth to resolve

    const supabase = createClient();

    if (user) {
      // Fetch balance from DB
      supabase
        .from("points_wallet")
        .select("balance")
        .eq("user_id", user.id)
        .single()
        .then(({ data }) => setBalance(data?.balance ?? 0));

      // Real-time subscription
      const channel = supabase
        .channel(`wallet:${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "points_wallet",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            const newBalance = (payload.new as { balance: number }).balance;
            setBalance(newBalance);
          }
        )
        .subscribe();

      return () => { supabase.removeChannel(channel); };
    } else {
      // Guest: use localStorage
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
