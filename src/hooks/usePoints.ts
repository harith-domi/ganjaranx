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
    let realtimeChannel: ReturnType<typeof supabase.channel> | null = null;

    async function init() {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);

        // Initial balance fetch
        const { data } = await supabase
          .from("points_wallet")
          .select("balance")
          .eq("user_id", user.id)
          .single();
        setBalance(data?.balance ?? 0);

        // Real-time subscription — fires whenever balance changes in DB
        realtimeChannel = supabase
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
      } else {
        const stored = localStorage.getItem(BALANCE_KEY);
        setBalance(stored !== null ? parseInt(stored, 10) || 0 : 0);
      }
    }

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      // Clean up previous channel
      if (realtimeChannel) {
        supabase.removeChannel(realtimeChannel);
        realtimeChannel = null;
      }

      if (session?.user) {
        setUserId(session.user.id);

        const { data } = await supabase
          .from("points_wallet")
          .select("balance")
          .eq("user_id", session.user.id)
          .single();
        setBalance(data?.balance ?? 0);

        // Re-subscribe for new user
        realtimeChannel = supabase
          .channel(`wallet:${session.user.id}`)
          .on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: "points_wallet",
              filter: `user_id=eq.${session.user.id}`,
            },
            (payload) => {
              const newBalance = (payload.new as { balance: number }).balance;
              setBalance(newBalance);
            }
          )
          .subscribe();
      } else {
        setUserId(null);
        const stored = localStorage.getItem(BALANCE_KEY);
        setBalance(stored !== null ? parseInt(stored, 10) || 0 : 0);
      }
    });

    return () => {
      subscription.unsubscribe();
      if (realtimeChannel) supabase.removeChannel(realtimeChannel);
    };
  }, []);

  const creditPoints = useCallback(async (pts: number, refId: string): Promise<boolean> => {
    if (userId) {
      // Logged-in: credit via server API (idempotent)
      // Balance will auto-update via real-time subscription
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
