import { useState, useCallback, useMemo } from "react";
import type { Price } from "../../types";

export function useSwapLogic(prices: Price[]) {
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [fromAmount, setFromAmount] = useState<number | string>("");
  const [toAmount, setToAmount] = useState<number | string>("");

  const getPrice = (symbol: string) =>
    prices?.find((p) => p.currency === symbol)?.price || 0;

  // *** Calculate cross-currency conversion ***
  const calculateValue = useCallback(
    (val: number | string, from: string, to: string) => {
      const amount = Number(val);
      const fromP = getPrice(from);
      const toP = getPrice(to);

      if (!amount || !fromP || !toP) return "";
      return Number(((amount * fromP) / toP).toFixed(6));
    },
    [prices]
  );

  // *** Swaps values func ***
  const handleFlip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  // *** Generates a readable exchange rate ***
  const exchangeRateLabel = useMemo(() => {
    const fromP = getPrice(fromToken);
    if (!fromToken || !fromP) return null;

    const toP = getPrice(toToken);
    if (toToken && toP) {
      const rate = (fromP / toP).toLocaleString(undefined, {
        maximumFractionDigits: 6,
      });
      return `1 ${fromToken} = ${rate} ${toToken}`;
    }

    return `1 ${fromToken} = ${fromP.toFixed(2)} USD`;
  }, [fromToken, toToken, prices]);

  return {
    fromToken,
    setFromToken,
    toToken,
    setToToken,
    fromAmount,
    setFromAmount,
    toAmount,
    setToAmount,
    handleFlip,
    exchangeRateLabel,
    calculateValue,
  };
}
