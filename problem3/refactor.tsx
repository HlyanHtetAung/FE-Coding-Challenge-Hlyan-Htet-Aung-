import { useMemo } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added missing property found in usage
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

// Moved getPriority outside the component.
// Since it doesn't depend on component props or state,
// keeping it outside prevents it from being recreated on every render

const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
    case "Neo":
      return 20; // Combined duplicate logic
    default:
      return -99;
  }
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const priority = getPriority(balance.blockchain);
        // Fixed variable error (lhsPriority was undefined).
        // Fixed logic. Original returned balance if amount <= 0.
        // Usually, we only want to show wallets that actually have money (> 0).
        return priority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        // Simplified sort logic. A simple subtraction
        // handles the -1, 1, and 0 (equality) cases correctly and stably.
        return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
      });
    // Removed 'prices' from dependencies.
    // Original code resorted every time prices changed, even though
    // prices don't affect the sort order. This is a big performance gain.
  }, [balances]);

  // Remove formattedBalances entirely.
  // Map directly from sortedBalances to the rows.
  const rows = sortedBalances.map((balance: WalletBalance) => {
    const usdValue = (prices[balance.currency] || 0) * balance.amount;

    return (
      <WalletRow
        className={classes.row}
        // Using a combination of 'currency' and 'blockchain' ensures a unique
        key={`${balance.currency}-${balance.blockchain}`}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.amount.toFixed(2)} // Added decimal precision
      />
    );
  });

  return (
    <div {...rest}>
      {rows}
      {/* add children since original forgot to render it. */}
      {children}
    </div>
  );
};
