import { useEffect, useRef } from "react"; // Added hooks
import type { Price } from "../../types";
import { getTokenIcon } from "../utils";

type Props = {
  prices: Price[];
  value: string;
  onChange: (v: string) => void;
};

function CurrencySelect({ prices, value, onChange }: Props) {
  // ** Create a reference to the dropdown element **
  const dropdownRef = useRef<HTMLDetailsElement>(null);

  // *** Handle clicking outside ***
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        dropdownRef.current.removeAttribute("open");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (currency: string) => {
    onChange(currency);
    // *** Close manually on selection **
    if (dropdownRef.current) {
      dropdownRef.current.removeAttribute("open");
    }
  };

  return (
    <details ref={dropdownRef} className="dropdown w-70">
      <summary className="select select-bordered flex items-center justify-between cursor-pointer list-none">
        <div className="flex items-center gap-2 overflow-hidden">
          {value && (
            <img
              src={getTokenIcon(value)}
              className="w-5 h-5 rounded-full"
              alt={value}
            />
          )}
          <span className="text-sm truncate">{value || "Select Token"}</span>
        </div>
      </summary>

      <ul
        className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box z-100 mt-1
                   max-h-60 overflow-y-auto block 
                   w-64 border border-base-content/10"
      >
        {prices.map((p, index: number) => (
          <li key={index} className="mb-1 last:mb-0">
            <button
              type="button"
              className="flex items-center justify-between w-full active:bg-primary"
              onClick={() => handleSelect(p.currency)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={getTokenIcon(p.currency)}
                  className="w-6 h-6 rounded-full"
                  alt={p.currency}
                />
                <span className="font-medium">{p.currency}</span>
              </div>
              {value === p.currency && (
                <span className="text-accent text-xs">●</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default CurrencySelect;
