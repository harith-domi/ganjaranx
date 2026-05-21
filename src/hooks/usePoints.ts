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
        // Read balance from DB
        const { data } = await supabase
          .from("points_wallet")
          .select("balance")
          .eq("user_id", user.id)
          .single();
        setBalance(data?.balance ?? 0);
      } else {
        // Fallback to localStorage for guests
        const stored = localStorage.getItem(BALANCE_KEY);
        setBalance(stored !== null ? parseInt(stored, 10) || 0 : 0);
      }
    }

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        // Refresh DB balance on auth change
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

  // Credit points — uses DB for logged-in users, localStorage for guests
  const creditPoints = useCallback(async (pts: number, refId: string): Promise<boolean> => {
    if (userId) {
      // For logged-in users, webhook already credited DB — just refresh balance
      const supabase = createClient();
      const { data } = await supabase
        .from("points_wallet")
        .select("balance")
        .eq("user_id", userId)
        .single();
      setBalance(data?.balance ?? 0);
      return true;
    }

    // Guest: use localStorage with idempotency check
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
