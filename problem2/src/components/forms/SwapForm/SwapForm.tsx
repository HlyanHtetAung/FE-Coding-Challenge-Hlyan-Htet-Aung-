import { usePrices } from "../../hooks";
import { useSwapLogic } from "../../hooks/useSwapLogic";

import { ConfirmSwapButton } from "../../Buttons";
import { SwapIcon } from "../../icons";
import { toast } from "sonner";
import { AmountField } from "../../AmountField";
import { useState } from "react";

function SwapForm() {
  const { data: prices, loading, error } = usePrices();
  const [isSwapping, setIsSwapping] = useState(false);
  const {
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
  } = useSwapLogic(prices);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSwapping(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success(`Swap successful!`, {
      description: `Swapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`,
      position: "top-center",
    });

    setFromAmount("");
    setToAmount("");
    setIsSwapping(false); // 6. Stop loading
  };

  if (loading)
    return (
      <div className="p-10 text-center animate-pulse">Loading market...</div>
    );
  if (error)
    return <div className="alert alert-error">Error loading prices</div>;

  return (
    <div className="px-4 w-full flex justify-center">
      <div className="relative group rounded-[2.5rem] max-w-md w-full">
        <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 via-purple-600 to-pink-500 rounded-[2.5rem] blur opacity-25" />

        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col gap-5 p-6 sm:p-8 rounded-[2.4rem] bg-gray-900/90 backdrop-blur-2xl border border-white/10"
        >
          <h3 className="text-xl sm:text-2xl font-black text-center bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Swap Tokens
          </h3>

          <AmountField
            title="Sell"
            prices={prices!}
            token={fromToken}
            amount={fromAmount}
            onTokenChange={(t) => {
              setFromToken(t);
              setToAmount(calculateValue(fromAmount, t, toToken));
            }}
            onAmountChange={(v) => {
              setFromAmount(v);
              setToAmount(calculateValue(v, fromToken, toToken));
            }}
          />

          <div className="flex justify-center z-10">
            <button
              type="button"
              onClick={handleFlip}
              className="bg-[#1a1b23] border border-white/10 p-2 rounded-full hover:scale-110 transition-transform"
            >
              <SwapIcon handleFlip={() => {}} />
            </button>
          </div>

          <AmountField
            title="Buy"
            prices={prices!}
            token={toToken}
            amount={toAmount}
            onTokenChange={(t) => {
              setToToken(t);
              setFromAmount(calculateValue(toAmount, t, fromToken));
            }}
            onAmountChange={(v) => {
              setToAmount(v);
              setFromAmount(calculateValue(v, toToken, fromToken));
            }}
          />

          {exchangeRateLabel && (
            <div className="flex justify-between items-center px-2 text-[11px]">
              <span className="font-bold text-gray-400 uppercase tracking-widest">
                Rate
              </span>
              <span className="font-mono text-cyan-400 font-semibold">
                {exchangeRateLabel}
              </span>
            </div>
          )}

          <ConfirmSwapButton
            disabled={!fromAmount || !fromToken || !toToken}
            loading={isSwapping}
          />
        </form>
      </div>
    </div>
  );
}

export default SwapForm;
