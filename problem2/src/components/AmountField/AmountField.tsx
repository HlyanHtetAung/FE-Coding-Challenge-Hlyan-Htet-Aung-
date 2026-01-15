import type { Price } from "../../types";
import { AmountInput } from "../AmountInput";
import { CurrencySelect } from "../CurrencySelect";

type Props = {
  title: string;
  prices: Price[];
  token: string;
  amount: number | string;
  onTokenChange: (v: string) => void;
  onAmountChange: (v: string | number) => void;
  disabled?: boolean;
};

function AmountField({
  title,
  prices,
  token,
  amount,
  onAmountChange,
  onTokenChange,
  disabled,
}: Props) {
  return (
    <div className="flex flex-col items-start gap-2">
      <p className="text-sm font-bold">{title}</p>
      <div className="flex gap-2">
        <AmountInput
          value={amount}
          onChange={onAmountChange}
          disabled={disabled || !token}
        />
        <CurrencySelect
          prices={prices}
          onChange={onTokenChange}
          value={token}
        />
      </div>
    </div>
  );
}

export default AmountField;
