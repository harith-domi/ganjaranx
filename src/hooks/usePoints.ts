"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase-browser";

const BALANCE_KEY = "gx_balance";
const CREDITED_KEY = "gx_credited_ids";

export function usePoints() {
  const [balance, setBalance] = useState<number | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function init() {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
        const { data } = await supabase
          .from("points_wallet")
          .select("balance")
          .eq("user_id", user.id)
          .single();
        setBalance(data?.balance ?? 0);
      } else {
        const stored = localStorage.getItem(BALANCE_KEY);
        setBalance(stored !== null ? parseInt(stored, 10) || 0 : 0);
      }
    }

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        supabase
          .from("points_wallet")
          .select("balance")
          .eq("user_id", session.user.id)
          .single()
          .then(({ data }) => setBalance(data?.balance ?? 0));
      } else {
        setUserId(null);
        const stored = localStorage.getItem(BALANCE_KEY);
        setBalance(stored !== null ? parseInt(stored, 10) || 0 : 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const creditPoints = useCallback(async (pts: number, refId: string): Promise<boolean> => {
    if (userId) {
      // Logged-in: credit via server API (idempotent — safe to call multiple times)
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

    // Guest: localStorage with idempotency check
    const raw = localStorage.getItem(CREDITED_KEY);
    const credited: string[] = raw ? JSON.parse(raw) : [];
    if (credited.includes(refId)) return false;

    const current = parseInt(localStorage.getItem(BALANCE_KEY) ?? "0", 10) || 0;
    const next = current + pts;
    localStorage.setItem(BALANCE_KEY, String(next));
    localStorage.setItem(CREDITED_KEY, JSON.stringify([...credited, refId]));
    setBalance(next);
    return true;
  }, [userId]);

  return { balance, creditPoints };
}
