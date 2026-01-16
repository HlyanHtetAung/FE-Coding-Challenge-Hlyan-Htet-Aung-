type Props = {
  loading?: boolean;
  disabled?: boolean;
};

function ConfirmSwapButton({ loading, disabled }: Props) {
  return (
    <button
      type="submit"
      className={`btn btn-accent w-full mt-5 flex items-center justify-center gap-2 ${
        loading ? "opacity-80 cursor-not-allowed" : ""
      }`}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <span className="loading loading-spinner loading-sm"></span>
          <span>Swapping...</span>
        </>
      ) : (
        "Confirm Swap"
      )}
    </button>
  );
}

export default ConfirmSwapButton;
