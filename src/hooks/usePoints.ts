"use client";

import { useState, useEffect, useCallback } from "react";

const BALANCE_KEY = "gx_balance";
const CREDITED_KEY = "gx_credited_ids";

export function usePoints() {
  const [balance, setBalance] = useState<number | null>(null); // null = not loaded yet

  useEffect(() => {
    const stored = localStorage.getItem(BALANCE_KEY);
    setBalance(stored !== null ? parseInt(stored, 10) || 0 : 0);
  }, []);

  const creditPoints = useCallback((pts: number, refId: string): boolean => {
    // Prevent double-crediting the same transaction
    const raw = localStorage.getItem(CREDITED_KEY);
    const credited: string[] = raw ? JSON.parse(raw) : [];
    if (credited.includes(refId)) return false;

    const current = parseInt(localStorage.getItem(BALANCE_KEY) ?? "0", 10) || 0;
    const next = current + pts;
    localStorage.setItem(BALANCE_KEY, String(next));
    localStorage.setItem(CREDITED_KEY, JSON.stringify([...credited, refId]));
    setBalance(next);
    return true;
  }, []);

  return { balance, creditPoints };
}
