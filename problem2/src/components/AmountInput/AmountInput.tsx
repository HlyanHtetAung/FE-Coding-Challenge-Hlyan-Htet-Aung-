type Props = {
  value: number | string;
  onChange: (v: number | string) => void;
  disabled?: boolean;
};

function AmountInput({ value, onChange, disabled }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      onChange("");
      return;
    }

    const numVal = Number(val);
    if (!Number.isNaN(numVal) && numVal >= 0) {
      onChange(numVal);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent minus sign, plus sign, and exponential 'e'
    if (e.key === "-" || e.key === "+" || e.key === "e" || e.key === "E") {
      e.preventDefault();
    }
  };

  return (
    <input
      type="number"
      value={value ?? ""}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      placeholder="0.00"
      className="input w-full [appearance:textfield] 
                 [&::-webkit-outer-spin-button]:appearance-none 
                 [&::-webkit-inner-spin-button]:appearance-none
                 disabled:bg-base-300 disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
}

export default AmountInput;
