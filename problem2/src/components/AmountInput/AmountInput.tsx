type Props = {
  value: number | string;
  onChange: (v: number | string) => void;
  disabled?: boolean; // Add this optional prop
};

function AmountInput({ value, onChange, disabled }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      onChange("");
      return;
    }
    onChange(Number(val));
  };

  return (
    <input
      type="number"
      value={value ?? ""}
      onChange={handleChange}
      disabled={disabled}
      placeholder="0.00"
      /* Added 'disabled:opacity-50' and 'disabled:cursor-not-allowed' for UI feedback */
      className="input w-full [appearance:textfield] 
                 [&::-webkit-outer-spin-button]:appearance-none 
                 [&::-webkit-inner-spin-button]:appearance-none
                 disabled:bg-base-300 disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
}

export default AmountInput;
