import clsx from 'clsx';

type NavProps = {
  maxStep: number;
  step: number;
  onPrev: () => void;
  onNext: () => void;
  canNext: boolean;
};

export const StepController = ({ maxStep, step, onNext, onPrev, canNext }: NavProps) => {
  return (
    <div className="row-between py-3 px-4 border-t border-[var(--color-border)]">
      {step > 0 ? (
        <button
          className="px-[8px] py-[5px] text-sm text-[var(--color-gray-accent)] font-medium cursor-pointer border border-[var(--color-background04)] rounded-[6px] bg-[var(--color-background02)] transition-opacity duration-150 ease-in-out hover:opacity-70"
          onClick={onPrev}
        >
          ← Previous
        </button>
      ) : (
        <div />
      )}

      {step < maxStep - 1 ? (
        <button
          className={clsx(
            'px-[8px] py-[5px] text-sm text-[var(--color-gray-accent)] font-medium cursor-pointer border border-[var(--color-background04)] rounded-[6px] bg-[var(--color-background02)] transition-opacity duration-150 ease-in-out hover:opacity-70',
            {
              'opacity-30 cursor-not-allowed hover:!opacity-30': !canNext,
            },
          )}
          onClick={onNext}
          disabled={!canNext}
        >
          Next →
        </button>
      ) : (
        <div />
      )}
    </div>
  );
};
