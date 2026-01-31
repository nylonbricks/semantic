import { twMerge } from "tailwind-merge";

interface NavProps {
  maxStep: number;
  step: number;
  onPrev: () => void;
  onNext: () => void;
  canNext: boolean;
}

export const StepController = ({
  maxStep,
  step,
  onNext,
  onPrev,
  canNext,
}: NavProps) => {
  return (
    <div className="row-between border-[var(--color-border)] border-t px-4 py-3">
      {step > 0 ? (
        <button
          className="cursor-pointer rounded-[6px] border border-[var(--color-background04)] bg-[var(--color-background02)] px-[8px] py-[5px] font-medium text-[var(--color-gray-accent)] text-sm transition-opacity duration-150 ease-in-out hover:opacity-70"
          onClick={onPrev}
          type="button"
        >
          ← Previous
        </button>
      ) : (
        <div />
      )}

      {step < maxStep - 1 ? (
        <button
          className={twMerge(
            "cursor-pointer rounded-[6px] border border-[var(--color-background04)] bg-[var(--color-background02)] px-[8px] py-[5px] font-medium text-[var(--color-gray-accent)] text-sm transition-opacity duration-150 ease-in-out hover:opacity-70",
            !canNext && "hover:!opacity-30 cursor-not-allowed opacity-30"
          )}
          disabled={!canNext}
          onClick={onNext}
          type="button"
        >
          Next →
        </button>
      ) : (
        <div />
      )}
    </div>
  );
};
