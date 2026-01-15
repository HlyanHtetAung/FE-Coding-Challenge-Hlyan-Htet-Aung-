type Props = {
  handleFlip: () => void;
};

function SwapIcon({ handleFlip }: Props) {
  return (
    <div
      className="flex items-center justify-center cursor-pointer"
      onClick={handleFlip}
    >
      <button className="p-2 rounded-full border border-slate-300 bg-white hover:bg-slate-100 shadow-sm cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-5 h-5 text-slate-600"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
          />
        </svg>
      </button>
    </div>
  );
}

export default SwapIcon;
