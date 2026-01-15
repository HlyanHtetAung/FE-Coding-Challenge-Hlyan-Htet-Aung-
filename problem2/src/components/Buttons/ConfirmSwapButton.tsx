type Props = {
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

function ConfirmSwapButton({ loading, onClick, disabled }: Props) {
  return (
    <button
      className="btn btn-accent w-full mt-5"
      onClick={onClick}
      disabled={disabled}
    >
      {loading && <span className="loading loading-spinner"></span>}
      {loading ? "Swapping..." : "Confirm Swap"}
    </button>
  );
}

export default ConfirmSwapButton;
